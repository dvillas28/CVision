import { randomUUID } from 'node:crypto';
import pinoHttp from 'pino-http';
import { logger } from '../lib/logger.js';

export const requestLogger = pinoHttp({
  logger,
  genReqId: (request) => request.headers['x-request-id'] || randomUUID(),
  customProps: (request) => ({
    requestId: request.id,
  }),
});
