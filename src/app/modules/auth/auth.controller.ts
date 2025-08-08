import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import { setAuthCookie } from '../../utils/setCookies';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userInfo = await AuthService.credentialLogin(req.body);

	setAuthCookie(res, userInfo);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Login Successful',
		data: {
			user: userInfo.user,
			accessToken: userInfo.accessToken,
			refreshToken: userInfo.refreshToken,
		},
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	res.clearCookie('accessToken', {
		httpOnly: true,
		secure: false,
		sameSite: 'lax',
	});
	res.clearCookie('refreshToken', {
		httpOnly: true,
		secure: false,
		sameSite: 'lax',
	});

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'User logout successful',
		data: null,
	});
});

export const AuthControllers = {
	credentialLogin,
	logout,
};
