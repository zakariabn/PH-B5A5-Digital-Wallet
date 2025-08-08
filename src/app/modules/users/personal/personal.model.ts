import { Schema, model } from 'mongoose';
import { Role } from '../shared/userBase/userBase.types';
import { userBaseFields } from '../shared/userBase/userBase.model';
import { IUserPersonal } from './personal.types';

const personalUserSchema = new Schema<IUserPersonal>(
  {
    ...userBaseFields,
    role: { type: String, default: Role.PERSONAL },
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  },
  { timestamps: true }
);

export const PersonalUser = model<IUserPersonal>('PersonalUser', personalUserSchema);
