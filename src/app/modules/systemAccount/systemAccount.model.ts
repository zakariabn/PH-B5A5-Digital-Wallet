import { Schema, model } from 'mongoose';
import { ISystemAccount } from './systemAccount.type';

const systemAccountSchema = new Schema<ISystemAccount>(
	{
		balance: { type: Number, default: 0 },
		totalInvestment: { type: Number, default: 0 },
		totalWithdrawal: { type: Number, default: 0 },
		totalCommissionEarned: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const SystemAccount = model<ISystemAccount>(
	'SystemAccount',
	systemAccountSchema
);
