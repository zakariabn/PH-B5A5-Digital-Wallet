import { NextFunction, Request, Response } from 'express';

import statusCode from 'http-status-codes';
import { verifyToken } from '../utils/jwt';
import { env } from '../config/env';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../helpers/AppError';
import { UserBaseService } from '../modules/users/shared/userBase/userBase.service';
import { Status } from '../modules/users/shared/userBase/userBase.types';
import { Wallet } from '../modules/wallet/wallet.model';

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

			// authenticating user role
			if (!authRoles.includes(verifiedToken.role)) {
				throw new AppError(statusCode.FORBIDDEN, 'Your are not authorized to access this route');
			}

			// admin user does not require wallet check
			if (verifiedToken.role === 'ADMIN') {
				req.user = verifiedToken;
				return next();
			}

			// checking if user have any restriction
			const user = await UserBaseService.findAnyUserByPhone(verifiedToken.phone);

			// all user status check
			if (!user || user.status !== Status.ACTIVE) {
				throw new AppError(
					statusCode.FORBIDDEN,
					user?.status ? `Your account status is ${user.status.toLowerCase()}` : 'User not found to validate status'
				);
			}

			// agent user approval check
			if (user.role === 'AGENT' && !user.isApproved) {
				throw new AppError(statusCode.FORBIDDEN, 'Your agent account is not approved yet, please contact support');
			}

			// personal and agent user wallet status check
			// (we should remove this form this auth check it's causes extra db call for that not necesarry to chcek wallets status)
			else {
				const wallet = await Wallet.findById(user).lean();

				if (!wallet || wallet.isFrozen) {
					throw new AppError(statusCode.FORBIDDEN, 'Your wallet is frozen, please contact support');
				}
				// in here in verifiedToken we can add wallet id to reduce database calls in future
				req.user = verifiedToken;
			}

			next();
		} catch (error) {
			next(error);
		}
	};
