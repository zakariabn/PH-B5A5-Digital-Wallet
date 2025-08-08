import mongoose, { Types } from 'mongoose';
import AppError from '../../helpers/AppError';
import { Wallet } from '../wallet/wallet.model';
import { ITopUpTransaction, ITransaction, TransactionStatus } from './transaction.types';
import { Transaction } from './transaction.model';
import { SystemAccount } from '../systemAccount/systemAccount.model';
import { Commission } from '../commission/commission.model';
import { CommissionRecipientType } from '../commission/commission.types';
import { updateSystemAccountBalance, updateWalletBalance } from '../../utils/transaction/updateBalance';
import { validateTransaction } from '../../utils/transaction/validateTransaction';

const handleSendMoney = async (payload: ITransaction) => {
	const { amount, type } = payload;
	const { sender, senderWallet, receiverWallet, chargeAmount, totalAmount } = await validateTransaction(payload);

	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		// Updating balances
		const updatedSenderWallet = await updateWalletBalance(senderWallet._id, totalAmount, 'remove', session);
		const updatedReceiverWallet = await updateWalletBalance(receiverWallet._id, amount, 'add', session);

		// Create transaction record
		const transaction: ITransaction = await new Transaction({
			senderWalletId: senderWallet._id,
			receiverWalletId: receiverWallet._id,
			amount,
			senderRole: sender.role,
			type,
			status: TransactionStatus.COMPLETED,
		}).save({ session });

		// System commission handling
		await updateSystemAccountBalance(chargeAmount, 'add', session);

		await new Commission({
			transactionId: transaction._id,
			amount: chargeAmount,
			recipientType: CommissionRecipientType.SYSTEM,
		}).save({ session });

		await session.commitTransaction();
		return {
			transaction,
			meta: {
				senderBalance: updatedSenderWallet?.balance,
				receiverBalance: updatedReceiverWallet?.balance,
			},
		};
	} catch (error) {
		await session.abortTransaction();
		throw new AppError(500, 'Transaction failed', error);
	} finally {
		await session.endSession();
	}
};

const handleCashIn = async (payload: ITransaction) => {
	const { amount, type } = payload;
	const { sender, senderWallet, receiverWallet, commissionAmount, totalAmount } = await validateTransaction(payload);

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Update sender and receiver wallet balances

		const updatedSenderWallet = await updateWalletBalance(senderWallet._id, totalAmount, 'remove', session);
		const updatedReceiverWallet = await updateWalletBalance(receiverWallet._id, amount, 'add', session);

		// Create transaction record
		const transaction = await new Transaction({
			senderWalletId: senderWallet._id,
			receiverWalletId: receiverWallet._id,
			amount,
			senderRole: sender.role,
			type,
			status: TransactionStatus.COMPLETED,
		}).save({ session });

		// System commission handling
		await updateSystemAccountBalance(commissionAmount, 'remove', session);

		// agent commission handling
		await updateWalletBalance(sender.commissionWallet as Types.ObjectId, commissionAmount, 'add', session);

		await new Commission({
			transactionId: transaction._id,
			amount: commissionAmount,
			recipientType: CommissionRecipientType.AGENT,
			recipientWalletId: sender.commissionWallet,
		}).save({ session });

		await session.commitTransaction();

		return {
			transaction,
			meta: {
				senderBalance: updatedSenderWallet?.balance,
				receiverBalance: updatedReceiverWallet?.balance,
			},
		};
	} catch (error) {
		await session.abortTransaction();
		throw new AppError(500, 'Transaction failed', error);
	} finally {
		await session.endSession();
	}
};

const handleCashOut = async (payload: ITransaction) => {
	const { amount, type } = payload;
	const { sender, senderWallet, receiver, receiverWallet, chargeAmount, commissionAmount, totalAmount } =
		await validateTransaction(payload);

	// spiting commission between system and agent
	const systemCommission = chargeAmount - commissionAmount;

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Update balances
		const updatedSenderWallet = await Wallet.findByIdAndUpdate(
			senderWallet._id,
			{ $inc: { balance: -totalAmount } },
			{ new: true, session }
		);
		const updatedReceiverWallet = await Wallet.findByIdAndUpdate(
			receiverWallet._id,
			{ $inc: { balance: amount } },
			{ new: true, session }
		);

		// Create transaction record
		const transaction = await new Transaction({
			senderWalletId: senderWallet._id,
			receiverWalletId: receiverWallet._id,
			amount,
			senderRole: sender.role,
			type,
			status: TransactionStatus.COMPLETED,
			chargeAmount,
			commissionAmount,
		}).save({ session });

		// Commission handling
		const systemAccount = await SystemAccount.findOne();
		if (!systemAccount) {
			throw new AppError(500, 'System account not found');
		}

		// Updating commission balances
		// System commission
		await SystemAccount.findByIdAndUpdate(systemAccount._id, { $inc: { balance: systemCommission } }, { session });

		// Agent commission
		await Wallet.findByIdAndUpdate(receiver.commissionWallet, { $inc: { balance: commissionAmount } }, { session });

		// Saving commission records
		await new Commission({
			transactionId: transaction._id,
			amount: systemCommission,
			recipientType: CommissionRecipientType.SYSTEM,
		}).save({ session });

		await new Commission({
			transactionId: transaction._id,
			amount: commissionAmount,
			recipientType: CommissionRecipientType.AGENT,
			recipientWalletId: receiver.commissionWallet,
		}).save({ session });

		await session.commitTransaction();
		return {
			transaction,
			meta: {
				senderBalance: updatedReceiverWallet?.balance,
				receiverBalance: updatedSenderWallet?.balance,
			},
		};
	} catch (error) {
		await session.abortTransaction();
		throw new AppError(500, 'Transaction failed', error);
	} finally {
		await session.endSession();
	}
};

const handleTopUp = async (payload: ITopUpTransaction) => {
	const { amount, rechargeNumber, senderWalletId } = payload;

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Update sender wallet balance
		const updatedSenderWallet = await updateWalletBalance(senderWalletId as Types.ObjectId, amount, 'remove', session);

		// getting system account info
		const systemAccount = await SystemAccount.findOne();
		if (!systemAccount) {
			throw new AppError(500, 'System account not found');
		}

		// Update system account balance (this is for test purposes)
		await SystemAccount.findByIdAndUpdate(systemAccount._id, { $inc: { balance: amount } }, { session });

		// Create transaction record
		const transaction = await new Transaction({
			senderWalletId,
			receiverWalletId: systemAccount._id,
			amount,
			type: payload.type,
			status: TransactionStatus.COMPLETED,
			rechargeNumber,
		}).save({ session });
		await session.commitTransaction();

		return {
			transaction,
			meta: {
				senderBalance: updatedSenderWallet?.balance,
			},
		};
	} catch (error) {
		await session.abortTransaction();
		throw new AppError(500, 'Top-up failed', error);
	} finally {
		await session.endSession();
	}
};

export const SendMoneyService = {
	handleSendMoney,
	handleCashIn,
	handleCashOut,
	handleTopUp,
};
