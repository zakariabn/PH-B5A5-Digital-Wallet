import AppError from '../../../helpers/AppError';
import { IUserBase } from '../shared/userBase/userBase.types';
import httpStatus from 'http-status-codes';
import { generateHash } from '../../../utils/hash';
import { Wallet } from '../../wallet/wallet.model';
import mongoose from 'mongoose';
import { AgentUser } from './agent.model';
import { Commission } from '../../commission/commission.model';
import { IWallet } from '../../wallet/wallet.types';

export const createAgentUser = async (payload: Partial<IUserBase>) => {
	if (!payload) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Payload is required');
	}

	const { name, phone, password, email } = payload;
	const hashPassword = await generateHash(password as string);

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// ✅ Creating both wallets in one call
		const [wallet] = await Wallet.create([{ balance: 50 }], { session });
		const [commissionWallet] = await Wallet.create([{ balance: 0 }], {
			session,
		});
		if (!wallet || !commissionWallet) {
			throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create wallets');
		}

		const [agentUser] = await AgentUser.create(
			[
				{
					name,
					phone,
					email,
					password: hashPassword,
					wallet: wallet._id,
					commissionWallet: commissionWallet._id,
				},
			],
			{ session }
		);

		await session.commitTransaction();
		return agentUser;
	} catch (error) {
		await session.abortTransaction();
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create agent user', error);
	} finally {
		session.endSession();
	}
};

export const viewCommission = async (userId: string) => {
	if (!userId) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Agent ID is required');
	}

	const agent = await AgentUser.findById(userId).populate('commissionWallet');
	const commissionWallet = agent?.commissionWallet as unknown as IWallet;

	const commissions = await Commission.find({ recipientWalletId: commissionWallet?._id }).sort({
		createdAt: -1,
	});

	return { commissions, balance: commissionWallet?.balance || 0 };
};

export const AgentUserService = {
	createAgentUser,
	viewCommission,
};
