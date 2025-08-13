"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialLoginZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const userBase_types_1 = require("../users/shared/userBase/userBase.types");
exports.credentialLoginZodSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
        message: 'Invalid Bangladeshi phone number',
    }),
    password: zod_1.default.string().regex(/^.{8,}$/, 'Password must be at least 8 characters long'),
    role: zod_1.default.enum(Object.values(userBase_types_1.Role)),
});
