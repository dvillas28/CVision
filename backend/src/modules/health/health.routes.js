import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';

export const healthRoutes = Router();

healthRoutes.get('/', async (_request, response) => {
  let database = 'ready';

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = 'unavailable';
  }

  response.json({
    status: 'ok',
    service: 'cvision-backend',
    timestamp: new Date().toISOString(),
    dependencies: {
      database,
    },
  });
});
