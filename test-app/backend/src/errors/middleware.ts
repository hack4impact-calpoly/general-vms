import { NextFunction, Request, Response, Express } from 'express';
import { RequestError } from './error-types';
import { sendErrorResponse, sendUnexpectedError } from './errors';

function errorLoggingMiddleware(err: unknown, _req: Request, _res: Response, next: NextFunction) {
  if (err instanceof RequestError) {
    console.error(err);
  } else {
    // Not great but okay for now
    console.error('Received unexpected error: ' + err.toString());
  }
  next(err);
}

function globalErrorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (!err) {
    next();
    return;
  }

  if (err instanceof RequestError) {
    sendErrorResponse(res, {
      message: err.message,
      e: err,
      status: err.getStatus(),
    });
  } else {
    sendUnexpectedError(res);
  }
}

export function setupErrorHandlingMiddleware(app: Express): void {
  app.use(errorLoggingMiddleware);
  app.use(globalErrorHandler);
}
