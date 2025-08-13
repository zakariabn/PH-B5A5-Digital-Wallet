"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBaseZodSchema = void 0;
// import { Types } from 'mongoose';
const zod_1 = __importDefault(require("zod"));
exports.userBaseZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2, { message: 'Name should be at least 2 characters' }).max(50, { message: 'Too long! Name should be max 50 characters' }).trim(),
    phone: zod_1.default.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
        message: 'Invalid Bangladeshi phone number',
    }),
    email: zod_1.default
        .string()
        .trim()
        .toLowerCase()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: 'Invalid email address',
    })
        .optional(),
    password: zod_1.default
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .refine(val => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
    })
        .refine(val => /\d/.test(val), {
        message: 'Password must contain at least one number',
    })
        .refine(val => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
        message: 'Password must contain at least one special character',
    }),
    // wallet: z.string().refine(val => Types.ObjectId.isValid(val), {
    //   message: 'Invalid ObjectId',
    // }),
});
