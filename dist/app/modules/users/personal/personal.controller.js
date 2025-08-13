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
exports.PersonalUserController = void 0;
const sendResponse_1 = require("../../../utils/sendResponse");
const personal_service_1 = require("./personal.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const userTokens_1 = require("../../../utils/userTokens");
const setCookies_1 = require("../../../utils/setCookies");
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const userBase_service_1 = require("../shared/userBase/userBase.service");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPersonalUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if any user with this phone number exist or not
    const isUserExist = yield userBase_service_1.UserBaseService.findAnyUserByPhone(req.body.phone);
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User already exist');
    }
    const user = yield personal_service_1.PersonalUserService.createPersonalUser(req.body);
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
const viewTransaction = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.user._id;
    const userWallet = req.user.wallet;
    const transactions = yield personal_service_1.PersonalUserService.viewTransaction(userWallet);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Transactions retrieved successfully',
        data: transactions,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkBalance = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userWallet = req.user.wallet;
    const wallet = yield personal_service_1.PersonalUserService.checkBalance(userWallet);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Wallet balance retrieved successfully',
        data: { currentBalance: wallet.balance },
    });
}));
exports.PersonalUserController = {
    createPersonalUser,
    viewTransaction,
    checkBalance,
};
