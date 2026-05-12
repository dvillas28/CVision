import { env } from './env.js';

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.CORS_ORIGIN.split(',').map((item) => item.trim()).includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
};
