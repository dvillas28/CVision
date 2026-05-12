import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  API_PREFIX: z.string().default('/api'),
  DATABASE_URL: z.string().min(1).default('postgresql://postgres:postgres@localhost:5432/cvision?schema=public'),
  JWT_ACCESS_SECRET: z.string().min(16).default('development-access-secret'),
  JWT_REFRESH_SECRET: z.string().min(16).default('development-refresh-secret'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.string().default('info'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment configuration', parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;

Object.entries(env).forEach(([key, value]) => {
  process.env[key] = String(value);
});
