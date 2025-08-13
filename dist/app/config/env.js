"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
/* eslint-disable no-console */
// src/config/env.ts or just env.ts
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// Load the .env file
dotenv_1.default.config();
// Define schema to validate env vars
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: zod_1.z.coerce.number().default(5000),
    MONGO_URI: zod_1.z.string().url(),
    JWT_ACCESS_SECRET: zod_1.z.string(),
    JWT_ACCESS_EXPIRES: zod_1.z.string(),
    JWT_REFRESH_SECRET: zod_1.z.string(),
    JWT_REFRESH_EXPIRES: zod_1.z.string(),
    BCRYPT_SALT_ROUND: zod_1.z.string(),
    SUPER_ADMIN_EMAIL: zod_1.z.string(),
    SUPER_ADMIN_PASSWORD: zod_1.z.string(),
    SUPER_ADMIN_PHONE: zod_1.z.string(),
});
// Validate and parse the env
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
}
exports.env = parsedEnv.data;
