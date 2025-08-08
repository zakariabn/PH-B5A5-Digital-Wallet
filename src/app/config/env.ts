/* eslint-disable no-console */
// src/config/env.ts or just env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

// Load the .env file
dotenv.config();

// Define schema to validate env vars
const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.coerce.number().default(5000),
	MONGO_URI: z.string().url(),

	JWT_ACCESS_SECRET: z.string(),
	JWT_ACCESS_EXPIRES: z.string(),

	JWT_REFRESH_SECRET: z.string(),
	JWT_REFRESH_EXPIRES: z.string(),

	BCRYPT_SALT_ROUND: z.string(),

	SUPER_ADMIN_EMAIL: z.string(),
	SUPER_ADMIN_PASSWORD: z.string(),
	SUPER_ADMIN_PHONE: z.string(),
});

// Validate and parse the env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		'❌ Invalid environment variables:',
		parsedEnv.error.flatten().fieldErrors
	);
	process.exit(1);
}

export const env = parsedEnv.data;
