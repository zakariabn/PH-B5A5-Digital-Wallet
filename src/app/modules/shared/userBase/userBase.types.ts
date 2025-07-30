import { Types } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  AGENT = 'agent',
}

export interface IUserAuthenticatedPayload {
  _id: Types.ObjectId;
  email: string;
  role: Role;
}

export interface IUserBase {
  _id?: Types.ObjectId;
  name: string;
  email?: string;
  phone: string;
  password: string;
  wallet: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
