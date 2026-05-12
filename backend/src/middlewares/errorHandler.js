import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { errorCodes } from '../errors/errorCodes.js';
import { env } from '../config/env.js';

export function errorHandler(error, request, response, _next) {
  const requestId = request.id;

  if (error instanceof ZodError) {
    return response.status(400).json({
      error: {
        code: errorCodes.VALIDATION_ERROR,
        message: 'Invalid request payload',
        details: error.issues,
        requestId,
      },
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        requestId,
      },
    });
  }

  request.log.error({ error }, 'Unhandled error');

  return response.status(500).json({
    error: {
      code: errorCodes.INTERNAL_ERROR,
      message: env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
      details: [],
      requestId,
    },
  });
}
