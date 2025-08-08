import { Types } from 'mongoose';
import AppError from '../helpers/AppError';
import { UserBaseService } from '../modules/users/shared/userBase/userBase.service';

import httpStatus from 'http-status-codes';
import { Wallet } from '../modules/wallet/wallet.model';

export const getUserAndWallet = async (walletId: Types.ObjectId) => {
	const user = await UserBaseService.findAnyUserByWalletId(walletId.toString());
	if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

	// const wallet = user.wallet as unknown as IWallet & Document;
	const wallet = await Wallet.findById(user.wallet);
	if (!wallet) throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');

	return [user, wallet] as const;
};
