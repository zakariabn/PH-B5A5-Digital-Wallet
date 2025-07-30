import { Types } from 'mongoose';

export enum TransactionType {
  TOP_UP = 'top-up',
  WITHDRAW = 'withdraw',
  SEND = 'send',
  CASH_IN = 'cash-in',
  CASH_OUT = 'cash-out',
}

export enum TransactionStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed',
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
  status: TransactionStatus;
  initiatorModel: InitiatorModel;
  initiatedBy: Types.ObjectId;
  failReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
