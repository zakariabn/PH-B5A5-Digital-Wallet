import { TransactionType } from '../../modules/transaction/transaction.types';
import { Role } from '../../modules/users/shared/userBase/userBase.types';

interface ICharge {
	value: number;
	type: 'percentage' | 'fixed';
}

export interface TransactionRule {
	from: Role;
	to: Role;
	type: TransactionType;
	allowed: boolean;
	charge?: ICharge;
	commission?: ICharge;
}

export interface TransactionValidationResult {
	allowed: boolean;
	charge?: ICharge;
	commission?: ICharge;
}

const transactionRules: TransactionRule[] = [
	// Agent ↔ Personal
	{
		from: Role.AGENT,
		to: Role.PERSONAL,
		type: TransactionType.CASH_IN,
		allowed: true,
		commission: { value: 0.4, type: 'percentage' },
	},

	// Agent ↔ Agent
	{
		from: Role.AGENT,
		to: Role.AGENT,
		type: TransactionType.SEND,
		allowed: true,
	},

	// Personal ↔ Agent
	{
		from: Role.PERSONAL,
		to: Role.AGENT,
		type: TransactionType.CASH_OUT,
		allowed: true,
		charge: { value: 1.85, type: 'percentage' },
		commission: { value: 0.4, type: 'percentage' },
	},

	// Personal ↔ Personal
	{
		from: Role.PERSONAL,
		to: Role.PERSONAL,
		type: TransactionType.SEND,
		allowed: true,
		charge: { value: 5, type: 'fixed' },
	},

	// Admin ↔ Agent
	{
		from: Role.ADMIN,
		to: Role.AGENT,
		type: TransactionType.SEND,
		allowed: true,
	},

	// Agent ↔  Admin
	{
		from: Role.AGENT,
		to: Role.ADMIN,
		type: TransactionType.WITHDRAW,
		allowed: true,
	},
];

export function validateTransactionRule(
	from: Role,
	to: Role,
	type: TransactionType
): TransactionValidationResult {
	const rule = transactionRules.find(
		r =>
			r.from.toLowerCase() === from.toLowerCase() &&
			r.to.toLowerCase() === to.toLowerCase() &&
			r.type.toLowerCase() === type.toLowerCase()
	);

	return {
		allowed: rule?.allowed ?? false,
		charge: rule?.charge,
		commission: rule?.commission,
	};
}
