import { Types } from 'mongoose';
import { IUserBase, Role } from '../shared/userBase/userBase.types';

export interface IUserPersonal extends Omit<IUserBase, 'role'> {
  role: Role.PERSONAL;
  wallet: Types.ObjectId;
}
