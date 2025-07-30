// src/models/Agent.ts
import { Schema, model } from 'mongoose';
import { userBaseFields } from '../shared/userBase/userBase.model';
import { Role } from '../shared/userBase/userBase.types';
import { IAgent } from './agent.types';

const agentSchema = new Schema<IAgent>({
  ...userBaseFields,
  role: { type: String, default: Role.AGENT },
  isSuspended: { type: Boolean, default: false },
  commissionWallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
});

export const Agent = model('Agent', agentSchema);
