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
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const userBase_types_1 = require("../modules/users/shared/userBase/userBase.types");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Access token not found');
        }
        // verifying token
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.env.JWT_ACCESS_SECRET);
        console.log(verifiedToken);
        // authenticating user role
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Your are not authorized to access this route');
        }
        // all user status check
        if (verifiedToken.status !== userBase_types_1.Status.ACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `Your account status is ${verifiedToken.status}`);
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
