import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { AdminUserService } from './admin.service';
import { viewUsersQueryZodSchema } from './admin.validate';

const createAdminUser = catchAsync(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async (req: Request, res: Response, next: NextFunction) => {
		// const user = await AgentUserService.createAgentUser(req.body);
		const result = await AdminUserService.createAdminUser(req.body.agentId);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.CREATED,
			message: 'Agent successfully approved',
			data: result,
		});
	}
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manageAgent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await AdminUserService.manageAgent(req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: 'Agent updated successfully',
		data: result,
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateWalletStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await AdminUserService.updateWalletStatus(req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: 'Wallet Status Updated',
		data: result,
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewTransactions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await AdminUserService.viewTransactions();

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: 'All transactions retrieved successfully.',
		data: result.transactions,
		meta: result.meta,
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewWallets = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await AdminUserService.viewWallets();

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: 'All Wallets retrieved successfully.',
		data: result.wallets,
		meta: result.meta,
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const query = await viewUsersQueryZodSchema.parseAsync(req.query);

	const result = await AdminUserService.viewUsers(query.view);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: `${query.view} users data successfully retrieved`,
		data: result.users,
		meta: result.meta,
	});
});

export const AdminUserController = {
	viewUsers,
	manageAgent,
	createAdminUser,
	updateWalletStatus,
	viewTransactions,
	viewWallets,
};
