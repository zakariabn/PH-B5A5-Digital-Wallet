/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from '../config/env';
import { generateToken, verifyToken } from './jwt';
import { IUserJwtPayload, Role } from '../modules/users/shared/userBase/userBase.types';

export function createUserTokens(user: IUserJwtPayload) {
	// jwt payload
	const jwtPayload = {
		userId: user._id,
		phone: user.phone,
		role: user.role,
		wallet: user.wallet,
		permissionLevel: user.permissionLevel ?? undefined,
	};

	// jwt token
	const accessToken = generateToken(jwtPayload, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES);
	const refreshToken = generateToken(jwtPayload, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES);

	return {
		accessToken,
		refreshToken,
	};
}
