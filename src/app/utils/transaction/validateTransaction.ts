import AppError from '../../helpers/AppError';
import { ITransaction } from '../../modules/transaction/transaction.types';
import { calculateAmount } from '../calculateAmount';
import { getUserAndWallet } from '../getUserAndWallet';
import { validateTransactionRule } from './validateTransactionRule';

export const validateTransaction = async (payload: ITransaction) => {
	const { senderWalletId, receiverWalletId, amount, type } = payload;

	if (!senderWalletId || !receiverWalletId) {
		throw new AppError(400, 'Sender and receiver wallet IDs are required');
	}
	if (!(amount > 0)) {
		throw new AppError(400, 'Amount must be a positive number');
	}

	const [sender, senderWallet] = await getUserAndWallet(senderWalletId);
	const [receiver, receiverWallet] = await getUserAndWallet(receiverWalletId);

	if (senderWallet._id.equals(receiverWallet._id)) {
		throw new AppError(400, 'Sender and receiver wallets cannot be the same');
	}

	const { allowed, charge, commission } = validateTransactionRule(sender.role, receiver.role, type);
	if (!allowed) {
		throw new AppError(403, `Transaction ${type} not allowed between ${sender.role} to ${receiver.role}`);
	}

	const chargeAmount = calculateAmount(charge, amount);
	const commissionAmount = calculateAmount(commission, amount);
	const totalAmount = amount + chargeAmount;

	if (senderWallet.balance < totalAmount) {
		throw new AppError(400, 'Insufficient balance in sender wallet');
	}

	return {
		sender,
		senderWallet,
		receiver,
		receiverWallet,
		chargeAmount,
		commissionAmount,
		totalAmount,
	};
};
