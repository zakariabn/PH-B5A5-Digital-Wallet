import { Schema, model } from 'mongoose';
import { ISystemSettings } from './settings.types';

const settingsSchema = new Schema<ISystemSettings>(
  {
    transactionFeePercentage: { type: Number, default: 0 },
    cashInCommissionPercentage: { type: Number, default: 0 },
    cashOutCommissionPercentage: { type: Number, default: 0 },
    minimumBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SystemSettings = model<ISystemSettings>('SystemSettings', settingsSchema);
