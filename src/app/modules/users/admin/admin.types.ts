import { IUserBase, Role } from '../shared/userBase/userBase.types';

export enum PermissionLevel {
	ADMIN = 1,
	SUPER_ADMIN = 2,
}

export interface IUserAdmin extends Omit<IUserBase, 'role' | 'wallet'> {
	role: Role.ADMIN;
	permissionLevel: number;
}
