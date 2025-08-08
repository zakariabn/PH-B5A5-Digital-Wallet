import z from 'zod';
import { TransactionType } from './transaction.types';

const commonTransactionFieldsShape = {
	senderWalletId: z.string().min(1, 'Sender ID is required'),
	receiverWalletId: z.string().min(1, 'Receiver ID is required'),
	amount: z.number().positive('Amount must be a positive number'),
	reference: z.string().optional(),
};

const commonTransactionFieldsZodSchema = z.object(commonTransactionFieldsShape);

export const sendMonyZodSchema = z.object({
	...commonTransactionFieldsShape,
	type: z.literal(TransactionType.SEND, 'Transaction type is required'),
	amount: z.number().positive('Amount must be a positive number'),
});

export const cashOutZodSchema = z.object({
	...commonTransactionFieldsShape,
	type: z.literal(TransactionType.CASH_OUT, 'Transaction type is required'),
	amount: z.number().positive('Amount must be a positive number'),
});

export const cashInZodSchema = z.object({
	...commonTransactionFieldsShape,
	type: z.literal(TransactionType.CASH_IN, 'Transaction type is required'),
	amount: z.number().positive('Amount must be a positive number'),
});

export const topUpZodSchema = commonTransactionFieldsZodSchema
	.omit({
		receiverWalletId: true,
	})
	.extend({
		type: z.literal(TransactionType.TOP_UP, 'Transaction type must be TOP_UP'),
		rechargeNumber: z.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
			message: 'Invalid Bangladeshi phone number',
		}),
	});
