// src/models/shared/userBaseFields.ts
import { Schema } from 'mongoose';

export const userBaseFields = {
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
};
