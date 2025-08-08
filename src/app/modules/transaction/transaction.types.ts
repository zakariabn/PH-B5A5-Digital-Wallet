import { Types } from 'mongoose';
import { Role } from '../users/shared/userBase/userBase.types';

export enum TransactionType {
	TOP_UP = 'TOP_UP',
	WITHDRAW = 'WITHDRAW',
	SEND = 'SEND',
	CASH_IN = 'CASH_IN',
	CASH_OUT = 'CASH_OUT',
}

export enum TransactionStatus {
	PENDING = 'PENDING',
	FAILED = 'FAILED',
	CANCELLED = 'CANCELLED',
	REVERSED = 'REVERSED',
	COMPLETED = 'COMPLETED',
}

export enum InitiatorModel {
	USER = 'User',
	AGENT = 'Agent',
	ADMIN = 'Admin',
}

export interface ITransaction {
	_id?: Types.ObjectId;
	senderWalletId?: Types.ObjectId;
	receiverWalletId?: Types.ObjectId;
	amount: number;
	type: TransactionType;
	status?: TransactionStatus;
	senderRole?: Role;
	failReason?: string;
	rechargeNumber?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ITopUpTransaction extends Pick<ITransaction, 'senderWalletId' | 'amount' | 'rechargeNumber'> {
	type: TransactionType.TOP_UP;
}
