import { Schema, model } from 'mongoose';
import { IWallet } from './wallet.types';

const walletSchema = new Schema<IWallet>(
  {
    balance: { type: Number, default: 0 },
    isFrozen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Wallet = model<IWallet>('Wallet', walletSchema);
