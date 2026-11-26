import type { CvFormData } from '../types/cvForm.js';
import { apiClient } from './apiClient.js';

export type AiSuggestionCategory = 'redaction' | 'ats' | 'keyword' | 'inconsistency' | 'missing_field';
export type AiSeverity = 'low' | 'medium' | 'high';

export interface AiFieldImprovement {
  improvedText: string;
  explanation: string;
  atsNotes: string[];
}

export interface AiSuggestion {
  id: string;
  title: string;
  category: AiSuggestionCategory;
  fieldPath: string;
  currentValue: string;
  suggestedValue: string;
  rationale: string;
  severity: AiSeverity;
}

export interface AiCvAnalysis {
  summary: string;
  score: number;
  suggestions: AiSuggestion[];
  inconsistencies: Array<{
    fieldPath: string;
    message: string;
    severity: AiSeverity;
  }>;
  missingFields: Array<{
    fieldPath: string;
    label: string;
    reason: string;
  }>;
  keywords: string[];
}

const AI_RATE_LIMIT_MESSAGE = 'Alcanzaste el límite de uso de la IA. Espera un momento e intenta nuevamente.';

async function aiRequest(path: string, payload: unknown) {
  try {
    return await apiClient(path, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // El backend ya responde en español; esto cubre un 429 sin cuerpo (p. ej. desde un proxy).
    const apiError = error as Error & { status?: number; code?: string };
    if (apiError.status === 429 && !apiError.code) {
      apiError.message = AI_RATE_LIMIT_MESSAGE;
    }
    throw error;
  }
}

export async function improveField(payload: {
  fieldPath: string;
  fieldLabel: string;
  text: string;
  selectedText?: string;
  targetRole?: string;
  cv: CvFormData;
}) {
  const response = await aiRequest('/ai/improve-field', payload);

  return response.data as AiFieldImprovement;
}

export async function analyzeCv(payload: {
  targetRole: string;
  cv: CvFormData;
}) {
  const response = await aiRequest('/ai/analyze-cv', payload);

  return response.data as AiCvAnalysis;
}
