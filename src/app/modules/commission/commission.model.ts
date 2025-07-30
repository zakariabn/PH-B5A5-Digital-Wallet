import { Schema, model } from 'mongoose';
import { ICommission } from './commission.types';

const commissionSchema = new Schema<ICommission>(
  {
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
    commissionAmount: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Commission = model<ICommission>('commission', commissionSchema);
