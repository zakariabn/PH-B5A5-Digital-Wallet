import z from 'zod';
import mongoose from 'mongoose';
// import { Status } from '../shared/userBase/userBase.types';

// export const userUpdatedFieldsZodSchema = z.object({
// 	status: z.enum(Status).optional(),
// 	isApproved: z.boolean().optional(),
// 	isFrozen: z.boolean().optional(),
// });

export const manageAgentZodSchema = z.object({
	agentId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
		message: 'Invalid ObjectId',
	}),
	isApproved: z.boolean().default(true),
});

export const updateWalletStatusZodSchema = z.object({
	walletId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
		message: 'Invalid ObjectId',
	}),
	isFrozen: z.boolean(),
});

export const viewUsersQueryZodSchema = z.object({
	view: z.enum(['all', 'admin', 'agent', 'personal']).optional(),
});
