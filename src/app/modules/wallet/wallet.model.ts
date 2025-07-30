import { Schema, model } from 'mongoose';
import { IWallet } from './wallet.types';

const walletSchema = new Schema<IWallet>(
  {
    balance: { type: Number, default: 50 },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Wallet = model<IWallet>('Wallet', walletSchema);
