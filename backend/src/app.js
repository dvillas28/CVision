import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { corsOptions } from './config/security.js';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiRoutes } from './routes/index.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  app.use(env.API_PREFIX, apiRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
