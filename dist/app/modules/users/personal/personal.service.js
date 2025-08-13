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
exports.PersonalUserService = void 0;
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const personal_model_1 = require("./personal.model");
const hash_1 = require("../../../utils/hash");
const wallet_model_1 = require("../../wallet/wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_model_1 = require("../../transaction/transaction.model");
const createPersonalUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Payload not found in service layer');
    }
    const { name, phone, password } = payload;
    const hashPassword = yield (0, hash_1.generateHash)(password);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const wallet = yield wallet_model_1.Wallet.create([{ balance: 50 }], { session });
        const userData = {
            name,
            phone,
            password: hashPassword,
            wallet: wallet[0]._id,
        };
        if (payload.email) {
            userData.email = payload.email;
        }
        const user = yield personal_model_1.PersonalUser.create([userData], { session });
        yield session.commitTransaction();
        return user[0];
    }
    catch (err) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong', err);
    }
    finally {
        session.endSession();
    }
});
const viewTransaction = (userWalletId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userWalletId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User Wallet ID is required to view transactions');
    }
    const transactions = yield transaction_model_1.Transaction.find({
        $or: [{ senderWalletId: userWalletId }, { receiverWalletId: userWalletId }],
    }).sort({ createdAt: -1 });
    return transactions;
});
const checkBalance = (userWalletId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userWalletId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User Wallet ID required to view Balance');
    }
    const wallet = yield wallet_model_1.Wallet.findById({ _id: userWalletId });
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found');
    }
    return wallet;
});
exports.PersonalUserService = {
    createPersonalUser,
    viewTransaction,
    checkBalance,
};
