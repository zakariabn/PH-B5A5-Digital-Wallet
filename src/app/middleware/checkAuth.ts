import { NextFunction, Request, Response } from 'express';

import statusCode from 'http-status-codes';
import { verifyToken } from '../utils/jwt';
import { env } from '../config/env';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../helpers/AppError';
import { Status } from '../modules/users/shared/userBase/userBase.types';

export const checkAuth =
	(...authRoles: string[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const accessToken = req.headers.authorization;

			if (!accessToken) {
				throw new AppError(statusCode.UNAUTHORIZED, 'Access token not found');
			}

			// verifying token
			const verifiedToken = verifyToken(accessToken, env.JWT_ACCESS_SECRET) as JwtPayload;
			console.log(verifiedToken);

			// authenticating user role
			if (!authRoles.includes(verifiedToken.role)) {
				throw new AppError(statusCode.FORBIDDEN, 'Your are not authorized to access this route');
			}

			// all user status check
			if (verifiedToken.status !== Status.ACTIVE) {
				throw new AppError(statusCode.FORBIDDEN, `Your account status is ${verifiedToken.status}`);
			}

			req.user = verifiedToken;
			next();
		} catch (error) {
			next(error);
		}
	};
