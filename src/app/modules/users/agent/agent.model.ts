// src/models/Agent.ts
import { Schema, model } from 'mongoose';

import { Role } from '../shared/userBase/userBase.types';
import { userBaseFields } from '../shared/userBase/userBase.model';
import { IUserAgent } from './agent.types';

const agentUserSchema = new Schema<IUserAgent>({
	...userBaseFields,
	role: { type: String, default: Role.AGENT },
	isApproved: { type: Boolean, default: false },
	wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
	commissionWallet: {
		type: Schema.Types.ObjectId,
		ref: 'Wallet',
		required: true,
	},
});

export const AgentUser = model<IUserAgent>('AgentUser', agentUserSchema);
