import { Types } from 'mongoose';
import { IUserPersonal } from '../../personal/personal.types';
import { IUserAgent } from '../../agent/agent.types';
import { IUserAdmin } from '../../admin/admin.types';

export enum Role {
	ADMIN = 'ADMIN',
	PERSONAL = 'PERSONAL',
	AGENT = 'AGENT',
}

export enum Status {
	ACTIVE = 'ACTIVE',
	BLOCKED = 'BLOCKED',
	SUSPENDED = 'SUSPENDED',
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
	status: Status;
	role: Role;
	wallet?: Types.ObjectId;
	commissionWallet?: Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}

export type IUserCommon = IUserPersonal | IUserAgent | IUserAdmin;

export interface IUserJwtPayload {
	_id: Types.ObjectId;
	phone: string;
	role: Role;
	wallet?: Types.ObjectId;
	permissionLevel?: number;
}
