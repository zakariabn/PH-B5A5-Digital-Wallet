import { ClientSession, Types } from 'mongoose';
import { Wallet } from '../../modules/wallet/wallet.model';
import { SystemAccount } from '../../modules/systemAccount/systemAccount.model';
import AppError from '../../helpers/AppError';

export const updateWalletBalance = async (
	walletId: Types.ObjectId,
	amount: number,
	type: 'add' | 'remove',
	session: ClientSession
) => {
	const updatedSenderWallet = await Wallet.findByIdAndUpdate(
		{ _id: walletId },
		{ $inc: { balance: type === 'add' ? amount : -amount } },
		{ new: true, session }
	);

	if (!updatedSenderWallet) {
		throw new AppError(500, 'Failed to update wallet balance');
	}
	return updatedSenderWallet;
};

export const updateSystemAccountBalance = async (
	amount: number,
	type: 'add' | 'remove',
	session: ClientSession
): Promise<void> => {
	// Fetch the system account
	const systemAccount = await SystemAccount.findOne();
	if (!systemAccount) {
		throw new AppError(500, 'System account not found');
	}

	await SystemAccount.findByIdAndUpdate(
		systemAccount._id,
		{
			$inc: {
				balance: type === 'add' ? amount : -amount,
				totalCommissionEarned: type === 'add' ? amount : 0,
			},
		},
		{ session }
	);
};
