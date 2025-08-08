import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { createUserTokens } from '../../../utils/userTokens';
import { setAuthCookie } from '../../../utils/setCookies';
import { catchAsync } from '../../../utils/catchAsync';
import AppError from '../../../helpers/AppError';
import { UserBaseService } from '../shared/userBase/userBase.service';
import { AgentUserService } from './agent.service';

const createAgentUser = catchAsync(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async (req: Request, res: Response, next: NextFunction) => {
		// checking if any user with this phone number exist or not
		const isUserExist = await UserBaseService.findAnyUserByPhone(req.body?.phone as string);

		if (isUserExist) {
			throw new AppError(httpStatus.BAD_REQUEST, 'User already exist');
		}

		const user = await AgentUserService.createAgentUser(req.body);

		const userTokens = createUserTokens(user);
		setAuthCookie(res, userTokens);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.CREATED,
			message: 'A new user created successfully',
			data: {
				user,
				accessToken: userTokens.accessToken,
				refreshToken: userTokens.refreshToken,
			},
		});
	}
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewCommission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await AgentUserService.viewCommission(req.user.userId);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Transactions retrieved successfully',
		data: {
			commissions: result.commissions,
			commissionWAlletBalance: result.balance,
		},
	});
});

export const AgentUserController = {
	createAgentUser,
	viewCommission,
};
