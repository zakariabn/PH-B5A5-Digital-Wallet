/* eslint-disable no-console */

import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import httpStatus from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (env.NODE_ENV !== 'production') {
    console.log(err);
  }

  let statusCode = 500;
  let message = 'Something Went Wrong!';

  if (err instanceof Error) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR; //500
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err: env.NODE_ENV === 'development' ? err : null,
    stack: env.NODE_ENV === 'development' ? err.stack : null,
  });
  next();
}
