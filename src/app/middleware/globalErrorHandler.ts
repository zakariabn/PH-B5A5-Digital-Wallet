/* eslint-disable no-console */

import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import httpStatus from 'http-status-codes';
import { handlerZodError } from '../helpers/errorHelpers/handlerZodError';
import { TErrorSources } from '../interfaces/error.types';
import AppError from '../helpers/AppError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	if (env.NODE_ENV !== 'production') {
		console.log(err);
	}

	let errorSources: TErrorSources[] = [];
	let statusCode = 500;
	let message = 'Something Went Wrong!';

	if (err.name === 'ZodError') {
		const simplifiedError = handlerZodError(err);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorSources = simplifiedError.errorSources as TErrorSources[];
	}
	//
	else if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
	}
	// last if above handler doesn't catch
	else if (err instanceof Error) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = err.message;
	}

	res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		err: env.NODE_ENV === 'development' ? err : null,
		stack: env.NODE_ENV === 'development' ? err.stack : null,
	});
}
