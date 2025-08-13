import { Response } from 'express';
import { env } from '../config/env';

export interface AuthTokens {
	accessToken?: string;
	refreshToken?: string;
}

export function setAuthCookie(res: Response, userInfo: AuthTokens) {
	// for access token
	if (userInfo.accessToken) {
		res.cookie('accessToken', userInfo.accessToken, {
			httpOnly: true,

			secure: env.NODE_ENV === 'production',
			sameSite: 'none',
		});
	}

	// for refresh token
	if (userInfo.refreshToken) {
		res.cookie('refreshToken', userInfo.refreshToken, {
			httpOnly: true,
			secure: env.NODE_ENV === 'production',
			sameSite: 'none',
		});
	}
}
