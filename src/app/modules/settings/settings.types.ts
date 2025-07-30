import { Types } from 'mongoose';

export interface ISystemSettings {
  _id: Types.ObjectId;
  transactionFeePercentage: number;
  cashInCommissionPercentage: number;
  cashOutCommissionPercentage: number;
  minimumBalance: number;
}
