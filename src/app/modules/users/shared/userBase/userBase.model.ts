// src/models/shared/userBaseFields.ts
import { Schema } from 'mongoose';
import { Status } from './userBase.types';

export const userBaseFields = {
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: Object.values(Status), default: Status.ACTIVE },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
};
