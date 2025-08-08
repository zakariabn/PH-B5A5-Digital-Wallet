import { AdminUser } from '../../admin/admin.model';
import { AgentUser } from '../../agent/agent.model';
import { IUserAgent } from '../../agent/agent.types';
import { PersonalUser } from '../../personal/personal.model';
import { IUserPersonal } from '../../personal/personal.types';
import { IUserCommon } from './userBase.types';

const findAnyUserByPhone = async (phone: string): Promise<IUserCommon | null> => {
	const user = (await AdminUser.findOne({ phone })) || (await AgentUser.findOne({ phone })) || (await PersonalUser.findOne({ phone }));

	return user;
};

const findAnyUserByWalletId = async (walletId: string): Promise<IUserPersonal | IUserAgent | null> => {
	//
	const user = (await AgentUser.findOne({ wallet: walletId })) || (await PersonalUser.findOne({ wallet: walletId }));

	return user;
};

export const UserBaseService = {
	findAnyUserByPhone,
	findAnyUserByWalletId,
};
