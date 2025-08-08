import { Types } from 'mongoose';

export interface IWallet {
  _id?: Types.ObjectId;
  balance: number;
  isFrozen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
