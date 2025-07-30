import { Types } from 'mongoose';

export interface IWallet {
  _id?: Types.ObjectId;
  balance: number;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
