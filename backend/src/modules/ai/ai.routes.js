import { Router } from 'express';
import { aiRateLimit } from '../../middlewares/aiRateLimit.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import * as aiController from './ai.controller.js';
import { analyzeCvSchema, improveFieldSchema } from './ai.validator.js';

export const aiRoutes = Router();

aiRoutes.use(authenticate, aiRateLimit);
aiRoutes.post('/improve-field', validate(improveFieldSchema), aiController.improveField);
aiRoutes.post('/analyze-cv', validate(analyzeCvSchema), aiController.analyzeCv);
