import AppError from '../../../helpers/AppError';
import { IUserBase } from '../shared/userBase/userBase.types';
import httpStatus from 'http-status-codes';
import { PersonalUser } from './personal.model';
import { generateHash } from '../../../utils/hash';
import { Wallet } from '../../wallet/wallet.model';
import mongoose from 'mongoose';
import { IUserPersonal } from './personal.types';
import { Transaction } from '../../transaction/transaction.model';

const createPersonalUser = async (payload: Partial<IUserBase>) => {
	if (!payload) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Payload not found in service layer');
	}

	const { name, phone, password } = payload;
	const hashPassword = await generateHash(password as string);

	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		const wallet = await Wallet.create([{ balance: 50 }], { session });

		const userData: Partial<IUserPersonal> = {
			name,
			phone,
			password: hashPassword,
			wallet: wallet[0]._id,
		};
		if (payload.email) {
			userData.email = payload.email;
		}

		const user = await PersonalUser.create([userData], { session });

		await session.commitTransaction();

		return user[0];
	} catch (err) {
		await session.abortTransaction();
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong', err);
	} finally {
		session.endSession();
	}
};

const viewTransaction = async (userWalletId: string) => {
	if (!userWalletId) {
		throw new AppError(httpStatus.BAD_REQUEST, 'User Wallet ID is required to view transactions');
	}

	const transactions = await Transaction.find({
		$or: [{ senderWalletId: userWalletId }, { receiverWalletId: userWalletId }],
	}).sort({ createdAt: -1 });

	return transactions;
};

const checkBalance = async (userWalletId: string) => {
	if (!userWalletId) {
		throw new AppError(httpStatus.BAD_REQUEST, 'User Wallet ID required to view Balance');
	}

	const wallet = await Wallet.findById({ _id: userWalletId });
	if (!wallet) {
		throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
	}

	return wallet;
};

export const PersonalUserService = {
	createPersonalUser,
	viewTransaction,
	checkBalance,
};
