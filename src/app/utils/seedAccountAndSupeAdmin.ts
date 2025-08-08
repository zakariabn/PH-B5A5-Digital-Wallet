/* eslint-disable no-console */
import { env } from '../config/env';
import AppError from '../helpers/AppError';
import { SystemAccount } from '../modules/systemAccount/systemAccount.model';
import { AdminUser } from '../modules/users/admin/admin.model';
import { PermissionLevel } from '../modules/users/admin/admin.types';
import { Role } from '../modules/users/shared/userBase/userBase.types';
import { generateHash } from './hash';

export const seedSystemAccount = async () => {
	try {
		const isSystemAccountExist = await SystemAccount.find();
		if (isSystemAccountExist.length > 0) {
			console.log('System account already exists, skipping seed.');
			return;
		}
		const systemAccount = new SystemAccount({
			balance: 100000,
			totalInvestment: 100000,
			totalWithdrawal: 0,
			totalCommissionEarned: 0,
		});
		await systemAccount.save();
		console.log('✅ System account seeded successfully.');
	} catch (error) {
		console.error('❌ Failed to seed system account:', error);
	}
};

export const seedSuperAdmin = async () => {
	try {
		// checking if super admin already exists
		const isSuperAdminExist = await AdminUser.findOne({
			role: Role.ADMIN,
			permissionLevel: PermissionLevel.SUPER_ADMIN,
		});
		if (isSuperAdminExist) {
			console.log('Super Admin already exists, skipping seed.');
			return;
		}

		// creating a new super admin
		const superAdmin = new AdminUser({
			name: 'Super Admin',
			phone: env.SUPER_ADMIN_PHONE,
			email: env.SUPER_ADMIN_EMAIL,
			password: await generateHash(env.SUPER_ADMIN_PASSWORD),
			role: Role.ADMIN,
			permissionLevel: PermissionLevel.SUPER_ADMIN,
		});
		await superAdmin.save();
		console.log('✅ Super Admin seeded successfully.');
	} catch (error) {
		throw new AppError(500, 'Failed to seed Super Admin', error);
	}
};
