"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const rolePermissions_1 = require("../utils/transaction/rolePermissions");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const checkPermission = (required) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'User not found in checkPermission'));
        }
        if (!user.role) {
            return res
                .status(http_status_codes_1.default.UNAUTHORIZED)
                .json({ message: 'Unauthorized: No role found' });
        }
        const rolePerms = rolePermissions_1.rolePermissions[user.role];
        // Ensure we work with an array
        const requiredPermissions = Array.isArray(required) ? required : [required];
        const hasPermission = requiredPermissions.every(perm => rolePerms === null || rolePerms === void 0 ? void 0 : rolePerms[perm]);
        if (!hasPermission) {
            return res
                .status(http_status_codes_1.default.FORBIDDEN)
                .json({ message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};
exports.checkPermission = checkPermission;
