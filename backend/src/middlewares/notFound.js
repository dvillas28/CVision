import { AppError } from '../errors/AppError.js';
import { errorCodes } from '../errors/errorCodes.js';

export function notFound(request, _response, next) {
  next(
    new AppError(`Route ${request.method} ${request.originalUrl} not found`, {
      statusCode: 404,
      code: errorCodes.NOT_FOUND,
    }),
  );
}
