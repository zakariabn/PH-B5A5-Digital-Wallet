import { Schema, model } from 'mongoose';
import { IUser } from './user.types';
import { Role } from '../shared/userBase/userBase.types';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: Role.USER },
    isBlocked: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
