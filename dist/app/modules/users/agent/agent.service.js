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
exports.AgentUserService = exports.viewCommission = exports.createAgentUser = void 0;
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const hash_1 = require("../../../utils/hash");
const wallet_model_1 = require("../../wallet/wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const agent_model_1 = require("./agent.model");
const commission_model_1 = require("../../commission/commission.model");
const createAgentUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Payload is required');
    }
    const { name, phone, password, email } = payload;
    const hashPassword = yield (0, hash_1.generateHash)(password);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // ✅ Creating both wallets in one call
        const [wallet] = yield wallet_model_1.Wallet.create([{ balance: 50 }], { session });
        const [commissionWallet] = yield wallet_model_1.Wallet.create([{ balance: 0 }], {
            session,
        });
        if (!wallet || !commissionWallet) {
            throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'Failed to create wallets');
        }
        const [agentUser] = yield agent_model_1.AgentUser.create([
            {
                name,
                phone,
                email,
                password: hashPassword,
                wallet: wallet._id,
                commissionWallet: commissionWallet._id,
            },
        ], { session });
        yield session.commitTransaction();
        return agentUser;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'Failed to create agent user', error);
    }
    finally {
        session.endSession();
    }
});
exports.createAgentUser = createAgentUser;
const viewCommission = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Agent ID is required');
    }
    const agent = yield agent_model_1.AgentUser.findById(userId).populate('commissionWallet');
    const commissionWallet = agent === null || agent === void 0 ? void 0 : agent.commissionWallet;
    const commissions = yield commission_model_1.Commission.find({ recipientWalletId: commissionWallet === null || commissionWallet === void 0 ? void 0 : commissionWallet._id }).sort({
        createdAt: -1,
    });
    return { commissions, balance: (commissionWallet === null || commissionWallet === void 0 ? void 0 : commissionWallet.balance) || 0 };
});
exports.viewCommission = viewCommission;
exports.AgentUserService = {
    createAgentUser: exports.createAgentUser,
    viewCommission: exports.viewCommission,
};
