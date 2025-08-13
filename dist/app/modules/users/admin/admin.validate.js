"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUsersQueryZodSchema = exports.updateWalletStatusZodSchema = exports.manageAgentZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { Status } from '../shared/userBase/userBase.types';
// export const userUpdatedFieldsZodSchema = z.object({
// 	status: z.enum(Status).optional(),
// 	isApproved: z.boolean().optional(),
// 	isFrozen: z.boolean().optional(),
// });
exports.manageAgentZodSchema = zod_1.default.object({
    agentId: zod_1.default.string().refine(val => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
    }),
    isApproved: zod_1.default.boolean().default(true),
});
exports.updateWalletStatusZodSchema = zod_1.default.object({
    walletId: zod_1.default.string().refine(val => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
    }),
    isFrozen: zod_1.default.boolean(),
});
exports.viewUsersQueryZodSchema = zod_1.default.object({
    view: zod_1.default.enum(['all', 'admin', 'agent', 'personal']),
});
