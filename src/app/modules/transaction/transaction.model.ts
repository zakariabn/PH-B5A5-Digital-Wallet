import { Schema, model } from 'mongoose';
import { ITransaction, TransactionStatus, TransactionType } from './transaction.types';

const transactionSchema = new Schema<ITransaction>(
	{
		senderWalletId: {
			type: Schema.Types.ObjectId,
			ref: 'Wallet',
			default: null,
		},
		receiverWalletId: {
			type: Schema.Types.ObjectId,
			ref: 'Wallet',
			default: null,
		},
		amount: { type: Number, required: true },
		type: {
			type: String,
			enum: Object.values(TransactionType),
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(TransactionStatus),
			default: TransactionStatus.PENDING,
		},
		failReason: { type: String },
		rechargeNumber: { type: String },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
