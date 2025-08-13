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
exports.AdminUserController = void 0;
const sendResponse_1 = require("../../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const admin_validate_1 = require("./admin.validate");
const createAdminUser = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await AgentUserService.createAgentUser(req.body);
    const result = yield admin_service_1.AdminUserService.createAdminUser(req.body.agentId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'Agent successfully approved',
        data: result,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manageAgent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminUserService.manageAgent(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'Agent updated successfully',
        data: result,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateWalletStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminUserService.updateWalletStatus(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'Wallet Status Updated',
        data: result,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewTransactions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminUserService.viewTransactions();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'All transactions retrieved successfully.',
        data: result.transactions,
        meta: result.meta,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewWallets = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminUserService.viewWallets();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'All Wallets retrieved successfully.',
        data: result.wallets,
        meta: result.meta,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viewUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield admin_validate_1.viewUsersQueryZodSchema.parseAsync(req.query);
    const result = yield admin_service_1.AdminUserService.viewUsers(query.view);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `${query.view} users data successfully retrieved`,
        data: result.users,
        meta: result.meta,
    });
}));
exports.AdminUserController = {
    viewUsers,
    manageAgent,
    createAdminUser,
    updateWalletStatus,
    viewTransactions,
    viewWallets,
};
