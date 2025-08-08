import { Schema, model } from 'mongoose';
import { CommissionRecipientType, ICommission } from './commission.types';

const commissionSchema = new Schema<ICommission>(
	{
		transactionId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Transaction',
		},
		recipientType: {
			type: String,
			enum: Object.values(CommissionRecipientType),
			required: true,
		},
		recipientWalletId: {
			type: Schema.Types.ObjectId,
			refPath: 'Agent',
			required: false,
		},
		amount: { type: Number, required: true, min: 0 },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

export const Commission = model<ICommission>('commission', commissionSchema);
