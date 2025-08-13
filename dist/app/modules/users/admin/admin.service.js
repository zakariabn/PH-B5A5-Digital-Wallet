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
exports.AdminUserService = void 0;
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const hash_1 = require("../../../utils/hash");
const admin_model_1 = require("./admin.model");
const agent_model_1 = require("../agent/agent.model");
const personal_model_1 = require("../personal/personal.model");
const wallet_model_1 = require("../../wallet/wallet.model");
const transaction_model_1 = require("../../transaction/transaction.model");
const createAdminUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Payload is required');
    }
    const { name, phone, password } = payload;
    const hashPassword = yield (0, hash_1.generateHash)(password);
    const userData = {
        name,
        phone,
        password: hashPassword,
    };
    if (payload.email) {
        userData.email = payload.email;
    }
    const adminUser = new admin_model_1.AdminUser(userData);
    yield adminUser.save();
    return adminUser;
});
const updateWalletStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, isFrozen } = payload;
    const wallet = yield wallet_model_1.Wallet.findOne({ _id: walletId });
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found');
    }
    wallet.isFrozen = isFrozen;
    yield wallet.save();
    return wallet;
});
const manageAgent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentId, isApproved } = payload;
    const agentUser = yield agent_model_1.AgentUser.findById(agentId).populate([{ path: 'wallet' }, { path: 'commissionWallet' }]);
    if (!agentUser) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Agent not found');
    }
    // Type narrowing: Check if the populated fields are actually objects (not ObjectIds)
    if (!agentUser.wallet || typeof agentUser.wallet === 'string' || 'toHexString' in agentUser.wallet) {
        throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'Wallet not populated');
    }
    if (!agentUser.commissionWallet || typeof agentUser.commissionWallet === 'string' || 'toHexString' in agentUser.commissionWallet) {
        throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'Commission wallet not populated');
    }
    const agentWallet = agentUser.wallet;
    const agentCommissionWallet = agentUser.commissionWallet;
    // update fields
    agentUser.isApproved = isApproved;
    agentWallet.isFrozen = !isApproved;
    agentCommissionWallet.isFrozen = !isApproved;
    // save all documents
    yield Promise.all([agentUser.save(), agentWallet.save(), agentCommissionWallet.save()]);
    return agentUser;
});
const viewUsers = (view) => __awaiter(void 0, void 0, void 0, function* () {
    let users = [];
    let userType = 'all';
    let totalCount = 0;
    if (view === 'agent') {
        users = yield agent_model_1.AgentUser.find({}).lean();
        userType = 'agent';
        totalCount = users.length;
    }
    else if (view === 'admin') {
        users = yield admin_model_1.AdminUser.find({}).lean();
        userType = 'admin';
        totalCount = users.length;
    }
    else if (view === 'personal') {
        users = yield personal_model_1.PersonalUser.find({}).lean();
        userType = 'personal';
        totalCount = users.length;
    }
    // for all user or not parameter
    else {
        const agentUser = yield agent_model_1.AgentUser.find({}).lean();
        const adminUser = yield admin_model_1.AdminUser.find({}).lean();
        const personalUser = yield personal_model_1.PersonalUser.find({}).lean();
        users = [...adminUser, ...agentUser, ...personalUser];
        totalCount = users.length;
    }
    return {
        users,
        meta: {
            userType,
            total: totalCount,
        },
    };
});
const viewWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_model_1.Wallet.find({});
    return {
        wallets,
        meta: {
            total: wallets.length,
        },
    };
});
const viewTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({});
    return {
        transactions,
        meta: {
            total: transactions.length,
        },
    };
});
exports.AdminUserService = {
    createAdminUser,
    updateWalletStatus,
    manageAgent,
    viewUsers,
    viewWallets,
    viewTransactions,
};
