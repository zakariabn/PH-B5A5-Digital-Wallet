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
exports.AgentUserController = void 0;
const sendResponse_1 = require("../../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const userTokens_1 = require("../../../utils/userTokens");
const setCookies_1 = require("../../../utils/setCookies");
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const userBase_service_1 = require("../shared/userBase/userBase.service");
const agent_service_1 = require("./agent.service");
const createAgentUser = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // checking if any user with this phone number exist or not
    const isUserExist = yield userBase_service_1.UserBaseService.findAnyUserByPhone((_a = req.body) === null || _a === void 0 ? void 0 : _a.phone);
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User already exist');
    }
    const user = yield agent_service_1.AgentUserService.createAgentUser(req.body);
    const userTokens = (0, userTokens_1.createUserTokens)(user);
    (0, setCookies_1.setAuthCookie)(res, userTokens);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'A new user created successfully',
        data: {
            user,
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
        },
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewCommission = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield agent_service_1.AgentUserService.viewCommission(req.user.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Transactions retrieved successfully',
        data: {
            commissions: result.commissions,
            commissionWAlletBalance: result.balance,
        },
    });
}));
exports.AgentUserController = {
    createAgentUser,
    viewCommission,
};
