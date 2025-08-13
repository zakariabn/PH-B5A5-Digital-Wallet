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
exports.AuthControllers = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
const setCookies_1 = require("../../utils/setCookies");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield auth_service_1.AuthService.credentialLogin(req.body);
    (0, setCookies_1.setAuthCookie)(res, userInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Login Successful',
        data: {
            user: userInfo.user,
            accessToken: userInfo.accessToken,
            refreshToken: userInfo.refreshToken,
        },
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User logout successful',
        data: null,
    });
}));
exports.AuthControllers = {
    credentialLogin,
    logout,
};
