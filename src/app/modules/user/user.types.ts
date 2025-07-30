import { IUserBase, Role } from '../shared/userBase/userBase.types';

export interface IUser extends IUserBase {
  role: Role.USER;
  isBlocked: boolean;
}
