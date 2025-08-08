import { Model } from 'mongoose';

import AppError from '../helpers/AppError';
import { PersonalUser } from '../modules/users/personal/personal.model';
import { AgentUser } from '../modules/users/agent/agent.model';
import { AdminUser } from '../modules/users/admin/admin.model';
import { IUserCommon, Role } from '../modules/users/shared/userBase/userBase.types';

export function getUserModelByRole(role: Role): Model<IUserCommon> {
  switch (role) {
    case Role.ADMIN:
      return AdminUser as Model<IUserCommon>;
    case Role.AGENT:
      return AgentUser as Model<IUserCommon>;
    case Role.PERSONAL:
      return PersonalUser as Model<IUserCommon>;
    default:
      throw new AppError(400, 'Invalid role');
  }
}
