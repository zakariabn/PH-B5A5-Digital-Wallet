import AppError from '../../../helpers/AppError';
import httpStatus from 'http-status-codes';
import { IUserBase } from '../shared/userBase/userBase.types';
import { generateHash } from '../../../utils/hash';
import { AdminUser } from './admin.model';
import { AgentUser } from '../agent/agent.model';
import { PersonalUser } from '../personal/personal.model';
import { IUserAdmin } from './admin.types';
import { Document } from 'mongoose';
import { Wallet } from '../../wallet/wallet.model';
import { IWallet } from '../../wallet/wallet.types';
import { Transaction } from '../../transaction/transaction.model';

type View = 'all' | 'personal' | 'agent' | 'admin';

const createAdminUser = async (payload: Partial<IUserBase>) => {
	if (!payload) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Payload is required');
	}

	const { name, phone, password } = payload;
	const hashPassword = await generateHash(password as string);

	const userData: Partial<IUserAdmin> = {
		name,
		phone,
		password: hashPassword,
	};
	if (payload.email) {
		userData.email = payload.email;
	}

	const adminUser = new AdminUser(userData);
	await adminUser.save();

	return adminUser;
};

const updateWalletStatus = async (payload: { walletId: string; isFrozen: boolean }) => {
	const { walletId, isFrozen } = payload;

	const wallet = await Wallet.findOne({ _id: walletId });
	if (!wallet) {
		throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
	}

	wallet.isFrozen = isFrozen;
	await wallet.save();
	return wallet;
};

const manageAgent = async (payload: { agentId: string; isApproved: boolean }) => {
	const { agentId, isApproved } = payload;
	const agentUser = await AgentUser.findById(agentId).populate([{ path: 'wallet' }, { path: 'commissionWallet' }]);

	if (!agentUser) {
		throw new AppError(httpStatus.NOT_FOUND, 'Agent not found');
	}

	// Type narrowing: Check if the populated fields are actually objects (not ObjectIds)
	if (!agentUser.wallet || typeof agentUser.wallet === 'string' || 'toHexString' in agentUser.wallet) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Wallet not populated');
	}

	if (!agentUser.commissionWallet || typeof agentUser.commissionWallet === 'string' || 'toHexString' in agentUser.commissionWallet) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Commission wallet not populated');
	}

	const agentWallet = agentUser.wallet as unknown as IWallet & Document;
	const agentCommissionWallet = agentUser.commissionWallet as unknown as IWallet & Document;

	// update fields
	agentUser.isApproved = isApproved;
	agentWallet.isFrozen = !isApproved;
	agentCommissionWallet.isFrozen = !isApproved;

	// save all documents
	await Promise.all([agentUser.save(), agentWallet.save(), agentCommissionWallet.save()]);

	return agentUser;
};

const viewUsers = async (view: View) => {
	let users: Partial<IUserBase>[] = [];
	let userType: View = 'all';
	let totalCount = 0;

	if (view === 'agent') {
		users = await AgentUser.find({}).lean();
		userType = 'agent';
		totalCount = users.length;
	} else if (view === 'admin') {
		users = await AdminUser.find({}).lean();
		userType = 'admin';
		totalCount = users.length;
	} else if (view === 'personal') {
		users = await PersonalUser.find({}).lean();
		userType = 'personal';
		totalCount = users.length;
	}
	// for all user or not parameter
	else {
		const agentUser = await AgentUser.find({}).lean();
		const adminUser = await AdminUser.find({}).lean();
		const personalUser = await PersonalUser.find({}).lean();
		users = [...adminUser, ...agentUser, ...personalUser];
		totalCount = users.length;
	}

	return {
		users,
		meta: {
			userType,
			total: totalCount,
		},
	};
};

const viewWallets = async () => {
	const wallets = await Wallet.find({});

	return {
		wallets,
		meta: {
			total: wallets.length,
		},
	};
};

const viewTransactions = async () => {
	const transactions = await Transaction.find({});

	return {
		transactions,
		meta: {
			total: transactions.length,
		},
	};
};

export const AdminUserService = {
	createAdminUser,
	updateWalletStatus,
	manageAgent,
	viewUsers,
	viewWallets,
	viewTransactions,
};
