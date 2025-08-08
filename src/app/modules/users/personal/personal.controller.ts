import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../../utils/sendResponse';
import { PersonalUserService } from './personal.service';
import httpStatus from 'http-status-codes';
import { createUserTokens } from '../../../utils/userTokens';
import { setAuthCookie } from '../../../utils/setCookies';
import { catchAsync } from '../../../utils/catchAsync';
import AppError from '../../../helpers/AppError';
import { UserBaseService } from '../shared/userBase/userBase.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPersonalUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	// checking if any user with this phone number exist or not
	const isUserExist = await UserBaseService.findAnyUserByPhone(req.body.phone as string);
	if (isUserExist) {
		throw new AppError(httpStatus.BAD_REQUEST, 'User already exist');
	}

	const user = await PersonalUserService.createPersonalUser(req.body);

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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	// const userId = req.user._id;
	const userWallet = req.user.wallet;
	const transactions = await PersonalUserService.viewTransaction(userWallet);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Transactions retrieved successfully',
		data: transactions,
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkBalance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userWallet = req.user.wallet;
	const wallet = await PersonalUserService.checkBalance(userWallet);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Wallet balance retrieved successfully',
		data: { currentBalance: wallet.balance },
	});
});

export const PersonalUserController = {
	createPersonalUser,
	viewTransaction,
	checkBalance,
};
