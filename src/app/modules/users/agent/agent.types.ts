// src/interfaces/agent/IAgent.ts

import { Types } from 'mongoose';
import { IUserBase, Role } from '../shared/userBase/userBase.types';

export interface IUserAgent extends Omit<IUserBase, 'role'> {
	role: Role.AGENT;
	isApproved: boolean;
	wallet: Types.ObjectId;
	commissionWallet: Types.ObjectId;
}
