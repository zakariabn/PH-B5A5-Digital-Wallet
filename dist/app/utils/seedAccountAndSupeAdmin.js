"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = exports.seedSystemAccount = void 0;
/* eslint-disable no-console */
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const systemAccount_model_1 = require("../modules/systemAccount/systemAccount.model");
const admin_model_1 = require("../modules/users/admin/admin.model");
const admin_types_1 = require("../modules/users/admin/admin.types");
const userBase_types_1 = require("../modules/users/shared/userBase/userBase.types");
const hash_1 = require("./hash");
const seedSystemAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSystemAccountExist = yield systemAccount_model_1.SystemAccount.find();
        if (isSystemAccountExist.length > 0) {
            console.log('System account already exists, skipping seed.');
            return;
        }
        const systemAccount = new systemAccount_model_1.SystemAccount({
            balance: 100000,
            totalInvestment: 100000,
            totalWithdrawal: 0,
            totalCommissionEarned: 0,
        });
        yield systemAccount.save();
        console.log('✅ System account seeded successfully.');
    }
    catch (error) {
        console.error('❌ Failed to seed system account:', error);
    }
});
exports.seedSystemAccount = seedSystemAccount;
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking if super admin already exists
        const isSuperAdminExist = yield admin_model_1.AdminUser.findOne({
            role: userBase_types_1.Role.ADMIN,
            permissionLevel: admin_types_1.PermissionLevel.SUPER_ADMIN,
        });
        if (isSuperAdminExist) {
            console.log('Super Admin already exists, skipping seed.');
            return;
        }
        // creating a new super admin
        const superAdmin = new admin_model_1.AdminUser({
            name: 'Super Admin',
            phone: env_1.env.SUPER_ADMIN_PHONE,
            email: env_1.env.SUPER_ADMIN_EMAIL,
            password: yield (0, hash_1.generateHash)(env_1.env.SUPER_ADMIN_PASSWORD),
            role: userBase_types_1.Role.ADMIN,
            permissionLevel: admin_types_1.PermissionLevel.SUPER_ADMIN,
        });
        yield superAdmin.save();
        console.log('✅ Super Admin seeded successfully.');
    }
    catch (error) {
        throw new AppError_1.default(500, 'Failed to seed Super Admin', error);
    }
});
exports.seedSuperAdmin = seedSuperAdmin;
