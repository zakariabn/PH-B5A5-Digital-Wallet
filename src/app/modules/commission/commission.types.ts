import { Types } from 'mongoose';

export enum CommissionRecipientType {
	AGENT = 'AGENT',
	SYSTEM = 'SYSTEM',
}

export interface ICommission {
	_id?: Types.ObjectId;
	transactionId: Types.ObjectId;
	recipientType: CommissionRecipientType;
	recipientWalletId?: Types.ObjectId;
	amount: number;
	createdAt?: Date;
	updatedAt?: Date;
}
