import { Schema, model } from 'mongoose';
import { Role } from '../shared/userBase/userBase.types';
import { userBaseFields } from '../shared/userBase/userBase.model';
import { IUserAdmin, PermissionLevel } from './admin.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { wallet, ...userBaseWithoutWalletField } = userBaseFields;

const adminUserSchema = new Schema<IUserAdmin>(
	{
		...userBaseWithoutWalletField,
		role: { type: String, default: Role.ADMIN },
		permissionLevel: { type: Number, default: PermissionLevel.ADMIN },
	},
	{ timestamps: true }
);

export const AdminUser = model<IUserAdmin>('AdminUser', adminUserSchema);
