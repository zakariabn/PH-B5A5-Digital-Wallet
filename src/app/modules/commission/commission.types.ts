import { Types } from 'mongoose';

export interface ICommission {
  _id: Types.ObjectId;
  agentId: Types.ObjectId;
  transactionId: Types.ObjectId;
  commissionAmount: number;
}
