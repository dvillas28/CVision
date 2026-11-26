import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  API_PREFIX: z.string().default('/api'),
  DATABASE_URL: z.string().min(1).default('postgresql://cvision:cvision@localhost:5433/cvision?schema=public'),
  DIRECT_URL: z.string().min(1).optional(),
  JWT_ACCESS_SECRET: z.string().min(16).default('development-access-secret'),
  JWT_REFRESH_SECRET: z.string().min(16).default('development-refresh-secret'),
  JWT_ACCESS_EXPIRES_IN: z.coerce.number().int().positive().default(900),
  JWT_REFRESH_EXPIRES_IN: z.coerce.number().int().positive().default(604800),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.string().default('info'),
  GEMINI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('gemini-2.5-flash-lite'),
  AI_IMPROVE_FIELD_MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(4096),
  AI_RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(5),
  AI_DAILY_LIMIT_PER_USER: z.coerce.number().int().positive().default(30),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment configuration', parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsedEnv.data,
  // Sin pooler (local/Docker) la conexion directa es la misma que DATABASE_URL.
  DIRECT_URL: parsedEnv.data.DIRECT_URL ?? parsedEnv.data.DATABASE_URL,
};

Object.entries(env).forEach(([key, value]) => {
  process.env[key] = String(value);
});
