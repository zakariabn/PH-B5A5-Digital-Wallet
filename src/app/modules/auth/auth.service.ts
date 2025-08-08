import AppError from '../../helpers/AppError';
import { getUserModelByRole } from '../../utils/getUserModel';
import { IUserBase, IUserCommon } from '../users/shared/userBase/userBase.types';
import httpStatus from 'http-status-codes';
import { validateHash } from '../../utils/hash';
import { Model } from 'mongoose';
import { createUserTokens } from '../../utils/userTokens';

const credentialLogin = async (payload: Partial<IUserBase>) => {
  // role
  const role = payload.role;
  if (!role) {
    throw new AppError(400, 'Role not found in payload');
  }

  const Model = getUserModelByRole(role) as Model<IUserCommon>;

  const { phone, password } = payload;

  // user existence check
  const user = await Model.findOne({ phone });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // password compare
  const isValidPassword = await validateHash(password as string, user.password as string);
  if (!isValidPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect Password');
  }

  // creating user tokens
  const userTokens = createUserTokens(user);

  // removing password form user data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = user.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

export const AuthService = {
  credentialLogin,
};
