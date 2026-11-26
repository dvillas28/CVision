import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';
import { AppError } from '../errors/AppError.js';
import { errorCodes } from '../errors/errorCodes.js';

const ONE_MINUTE_MS = 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// Va despues de `authenticate`: la clave es el usuario, no la IP.
// Store en memoria: suficiente para una sola instancia, pero se reinicia
// cuando el proceso se reinicia (p. ej. cuando Render duerme el servicio).
function createUserLimiter({ windowMs, limit, message }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: (request) => request.user.id,
    handler: (_request, _response, next, options) => {
      next(
        new AppError(message, {
          statusCode: options.statusCode,
          code: errorCodes.RATE_LIMITED,
        }),
      );
    },
  });
}

export const aiRateLimit = [
  createUserLimiter({
    windowMs: ONE_MINUTE_MS,
    limit: env.AI_RATE_LIMIT_PER_MINUTE,
    message: 'Estás usando la IA muy rápido. Espera un minuto e intenta nuevamente.',
  }),
  createUserLimiter({
    windowMs: ONE_DAY_MS,
    limit: env.AI_DAILY_LIMIT_PER_USER,
    message: 'Alcanzaste el límite diario de solicitudes de IA. Vuelve a intentarlo mañana.',
  }),
];
