import { z } from 'zod';
import { env } from '../../config/env.js';
import { AppError } from '../../errors/AppError.js';
import { errorCodes } from '../../errors/errorCodes.js';
import { logger } from '../../lib/logger.js';

const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

const fieldImprovementResponseSchema = z.object({
  improvedText: z.string(),
  explanation: z.string(),
  atsNotes: z.array(z.string()),
});

const cvAnalysisResponseSchema = z.object({
  summary: z.string(),
  score: z.number().min(0).max(100),
  suggestions: z.array(z.object({
    id: z.string(),
    title: z.string(),
    category: z.enum(['redaction', 'ats', 'keyword', 'inconsistency', 'missing_field']),
    fieldPath: z.string(),
    currentValue: z.string(),
    suggestedValue: z.string(),
    rationale: z.string(),
    severity: z.enum(['low', 'medium', 'high']),
  })),
  inconsistencies: z.array(z.object({
    fieldPath: z.string(),
    message: z.string(),
    severity: z.enum(['low', 'medium', 'high']),
  })),
  missingFields: z.array(z.object({
    fieldPath: z.string(),
    label: z.string(),
    reason: z.string(),
  })),
  keywords: z.array(z.string()),
});

const fieldImprovementJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['improvedText', 'explanation', 'atsNotes'],
  properties: {
    improvedText: { type: 'string' },
    explanation: { type: 'string' },
    atsNotes: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};

const cvAnalysisJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'score', 'suggestions', 'inconsistencies', 'missingFields', 'keywords'],
  properties: {
    summary: { type: 'string' },
    score: { type: 'number' },
    suggestions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'title', 'category', 'fieldPath', 'currentValue', 'suggestedValue', 'rationale', 'severity'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          category: { type: 'string', enum: ['redaction', 'ats', 'keyword', 'inconsistency', 'missing_field'] },
          fieldPath: { type: 'string' },
          currentValue: { type: 'string' },
          suggestedValue: { type: 'string' },
          rationale: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high'] },
        },
      },
    },
    inconsistencies: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['fieldPath', 'message', 'severity'],
        properties: {
          fieldPath: { type: 'string' },
          message: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high'] },
        },
      },
    },
    missingFields: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['fieldPath', 'label', 'reason'],
        properties: {
          fieldPath: { type: 'string' },
          label: { type: 'string' },
          reason: { type: 'string' },
        },
      },
    },
    keywords: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};

const GROQ_API_BASE_URL = 'https://api.groq.com/openai/v1';

function providerError(message, { statusCode, provider, details = [], retryable = false, code }) {
  const error = new AppError(message, {
    statusCode,
    code: code ?? errorCodes.AI_PROVIDER_ERROR,
    details,
  });
  error.provider = provider;
  // Solo los errores de cuota o de disponibilidad justifican probar otro proveedor.
  error.retryable = retryable;
  return error;
}

function httpProviderError(provider, response, payload) {
  if (response.status === 429) {
    return providerError('El servicio de IA alcanzó su cuota de uso. Intenta nuevamente más tarde.', {
      statusCode: 429,
      code: errorCodes.AI_QUOTA_EXCEEDED,
      provider,
      retryable: true,
    });
  }

  return providerError(payload?.error?.message ?? `${provider} request failed`, {
    statusCode: response.status >= 500 ? 502 : 400,
    provider,
    details: payload?.error ? [payload.error] : [],
    retryable: response.status >= 500,
  });
}

function extractGeminiOutputText(payload) {
  const candidate = payload?.candidates?.[0];

  if (candidate?.finishReason === 'MAX_TOKENS') {
    throw providerError('Gemini response was truncated before producing complete JSON', {
      statusCode: 502,
      provider: 'gemini',
      details: candidate.safetyRatings ?? [],
    });
  }

  if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
    throw providerError(`Gemini finished without usable output: ${candidate.finishReason}`, {
      statusCode: 422,
      provider: 'gemini',
      details: candidate.safetyRatings ?? [],
    });
  }

  const outputText = candidate?.content?.parts
    ?.map((part) => part.text)
    .filter((text) => typeof text === 'string')
    .join('')
    .trim();

  if (outputText) {
    return outputText;
  }

  for (const feedback of [payload?.promptFeedback, candidate]) {
    if (feedback?.blockReason) {
      throw providerError(`Gemini blocked the request: ${feedback.blockReason}`, {
        statusCode: 422,
        provider: 'gemini',
        details: feedback.safetyRatings ?? [],
      });
    }
  }

  throw providerError('Gemini response did not include usable text output', {
    statusCode: 502,
    provider: 'gemini',
  });
}

function parseStructuredJson(outputText, provider) {
  try {
    return JSON.parse(outputText);
  } catch {
    const firstObjectIndex = outputText.indexOf('{');
    const lastObjectIndex = outputText.lastIndexOf('}');

    if (firstObjectIndex >= 0 && lastObjectIndex > firstObjectIndex) {
      try {
        return JSON.parse(outputText.slice(firstObjectIndex, lastObjectIndex + 1));
      } catch {
      }
    }

    throw providerError(`${provider} response was not valid JSON`, {
      statusCode: 502,
      provider,
    });
  }
}

async function callGemini({ instructions, input, schema, maxOutputTokens }) {
  const response = await fetch(`${GEMINI_API_BASE_URL}/models/${env.AI_MODEL}:generateContent`, {
    method: 'POST',
    headers: {
      'x-goog-api-key': env.GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: instructions }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(input) }],
        },
      ],
      generationConfig: {
        maxOutputTokens,
        responseMimeType: 'application/json',
        responseJsonSchema: schema,
      },
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw httpProviderError('gemini', response, payload);
  }

  return parseStructuredJson(extractGeminiOutputText(payload), 'gemini');
}

async function callGroq({ instructions, input, schema, schemaName, maxOutputTokens }) {
  const response = await fetch(`${GROQ_API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.AI_FALLBACK_MODEL,
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: JSON.stringify(input) },
      ],
      // El free tier de Groq tiene ~8K tokens por minuto: se acota la salida.
      max_completion_tokens: Math.min(maxOutputTokens, env.AI_FALLBACK_MAX_OUTPUT_TOKENS),
      reasoning_effort: 'low',
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: schemaName,
          strict: true,
          schema,
        },
      },
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw httpProviderError('groq', response, payload);
  }

  const choice = payload?.choices?.[0];

  if (choice?.finish_reason === 'length') {
    throw providerError('Groq response was truncated before producing complete JSON', {
      statusCode: 502,
      provider: 'groq',
    });
  }

  const outputText = choice?.message?.content?.trim();

  if (!outputText) {
    throw providerError('Groq response did not include usable text output', {
      statusCode: 502,
      provider: 'groq',
    });
  }

  return parseStructuredJson(outputText, 'groq');
}

function configuredProviders() {
  return [
    env.GEMINI_API_KEY && { name: 'gemini', call: callGemini },
    env.GROQ_API_KEY && { name: 'groq', call: callGroq },
  ].filter(Boolean);
}

async function createStructuredResponse(request) {
  const providers = configuredProviders();

  if (providers.length === 0) {
    throw new AppError('No AI provider API key is configured', {
      statusCode: 503,
      code: errorCodes.AI_CONFIGURATION_ERROR,
    });
  }

  let lastError;

  for (const [index, provider] of providers.entries()) {
    try {
      return await provider.call(request);
    } catch (error) {
      lastError = error;
      const nextProvider = providers[index + 1];

      if (!error.retryable || !nextProvider) {
        throw error;
      }

      logger.warn(
        { provider: provider.name, fallback: nextProvider.name, statusCode: error.statusCode },
        'AI provider unavailable, falling back',
      );
    }
  }

  throw lastError;
}

export async function improveField({ fieldPath, fieldLabel, text, selectedText, targetRole, cv }) {
  const textToImprove = selectedText?.trim() || text.trim();

  if (!textToImprove) {
    throw new AppError('The selected field text is empty', {
      statusCode: 400,
      code: errorCodes.VALIDATION_ERROR,
    });
  }

  const result = await createStructuredResponse({
    schema: fieldImprovementJsonSchema,
    schemaName: 'field_improvement',
    maxOutputTokens: env.AI_IMPROVE_FIELD_MAX_OUTPUT_TOKENS,
    instructions: [
      'Eres un especialista en empleabilidad chilena, redacción profesional y CVs compatibles con ATS.',
      'Mejora solo el texto indicado, manteniendo idioma, veracidad, longitud razonable y formato de líneas cuando corresponda.',
      'Prioriza completar improvedText; mantén explanation en una frase breve y atsNotes en máximo 3 notas cortas.',
      'No inventes cargos, empresas, fechas, métricas ni tecnologías no presentes.',
      'Devuelve JSON válido según el esquema solicitado.',
    ].join(' '),
    input: {
      fieldPath,
      fieldLabel,
      text: textToImprove,
      fullFieldText: text,
      targetRole: targetRole?.trim() || '',
      cv,
    },
  });

  return fieldImprovementResponseSchema.parse(result);
}

export async function analyzeCv({ targetRole, cv }) {
  const result = await createStructuredResponse({
    schema: cvAnalysisJsonSchema,
    schemaName: 'cv_analysis',
    maxOutputTokens: 8192,
    instructions: [
      'Eres un experto en reclutamiento, ATS y revisión de CVs para estudiantes próximos a egresar y recién titulados en Chile.',
      'Analiza redacción, claridad, compatibilidad ATS, campos relevantes vacíos, fechas inconsistentes y palabras clave para el cargo o área objetivo.',
      'Cada sugerencia aplicable debe usar un fieldPath existente del objeto CV recibido y un suggestedValue listo para reemplazar ese campo.',
      'Usa fieldPath en formato dot-path canónico del snapshot CV: sin prefijo "cv.", sin brackets, con índices numéricos como "sections.experience.0.summary".',
      'Las sugerencias accionables deben apuntar solo a campos string editables: basics.*, socialsExtra.<index>.network|username|url, sections.experience.<index>.*, sections.personalProjects.<index>.*, sections.skills.<index>.label|details o sections.education.<index>.*.',
      'No inventes experiencia, instituciones, fechas ni logros. Si recomiendas keywords, inclúyelas en la lista keywords.',
      'Devuelve JSON válido según el esquema solicitado.',
    ].join(' '),
    input: {
      targetRole,
      cv,
    },
  });

  return cvAnalysisResponseSchema.parse(result);
}
