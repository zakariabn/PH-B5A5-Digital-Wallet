// utils/rolePermissions.ts

import { Role } from '../../modules/users/shared/userBase/userBase.types';

export type Permission =
	| 'canViewUsers'
	| 'canViewAgents'
	| 'canViewWallets'
	| 'canViewTransactions'
	| 'canBlockWallets'
	| 'canUnblockWallets'
	| 'canApproveAgents'
	| 'canSuspendAgents'
	| 'canSetSystemParameters'
	| 'canAddMoney'
	| 'canWithdrawMoney'
	| 'canSendMoney'
	| 'canCashIn'
	| 'canCashOut'
	| 'canViewCommission';

type RolePermissions = Record<Role, Record<Permission, boolean>>;

export const rolePermissions: RolePermissions = {
	ADMIN: {
		canViewUsers: true,
		canViewAgents: true,
		canViewWallets: true,
		canViewTransactions: true,
		canBlockWallets: true,
		canUnblockWallets: true,
		canApproveAgents: true,
		canSuspendAgents: true,
		canSetSystemParameters: true,
		canAddMoney: false,
		canWithdrawMoney: false,
		canSendMoney: false,
		canCashIn: false,
		canCashOut: false,
		canViewCommission: false,
	},
	PERSONAL: {
		canViewUsers: false,
		canViewAgents: false,
		canViewWallets: false,
		canViewTransactions: true,
		canBlockWallets: false,
		canUnblockWallets: false,
		canApproveAgents: false,
		canSuspendAgents: false,
		canSetSystemParameters: false,
		canAddMoney: true,
		canWithdrawMoney: true,
		canSendMoney: true,
		canCashIn: false,
		canCashOut: false,
		canViewCommission: false,
	},
	AGENT: {
		canViewUsers: false,
		canViewAgents: false,
		canViewWallets: false,
		canViewTransactions: true,
		canBlockWallets: false,
		canUnblockWallets: false,
		canApproveAgents: false,
		canSuspendAgents: false,
		canSetSystemParameters: false,
		canAddMoney: false,
		canWithdrawMoney: false,
		canSendMoney: false,
		canCashIn: true,
		canCashOut: true,
		canViewCommission: true,
	},
};
