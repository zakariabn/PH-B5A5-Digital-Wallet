import { Schema, model } from 'mongoose';
import { InitiatorModel, ITransaction, TransactionStatus, TransactionType } from './transaction.types';

const transactionSchema = new Schema<ITransaction>(
  {
    senderWalletId: { type: Schema.Types.ObjectId, ref: 'Wallet', default: null },
    receiverWalletId: { type: Schema.Types.ObjectId, ref: 'Wallet', default: null },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    status: { type: String, enum: Object.values(TransactionStatus), default: TransactionStatus.PENDING },
    failReason: { type: String },
    initiatorModel: {
      type: String,
      required: true,
      enum: Object.values(InitiatorModel),
    },
    initiatedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'initiatorModel',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
