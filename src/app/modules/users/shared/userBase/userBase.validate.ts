// import { Types } from 'mongoose';
import z from 'zod';

export const userBaseZodSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Name should be at least 2 characters' })
		.max(50, { message: 'Too long! Name should be max 50 characters' })
		.trim(),
	phone: z.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
		message: 'Invalid Bangladeshi phone number',
	}),

	email: z
		.string()
		.trim()
		.toLowerCase()
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
			message: 'Invalid email address',
		})
		.optional(),
	password: z
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
});
