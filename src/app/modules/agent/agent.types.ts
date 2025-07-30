// src/interfaces/agent/IAgent.ts

import { Types } from 'mongoose';
import { IUserBase, Role } from '../shared/userBase/userBase.types';

export interface IAgent extends IUserBase {
  role: Role.AGENT;
  isSuspended: boolean;
  commissionWallet: Types.ObjectId;
}
