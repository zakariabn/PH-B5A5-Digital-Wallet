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
exports.updateSystemAccountBalance = exports.updateWalletBalance = void 0;
const wallet_model_1 = require("../../modules/wallet/wallet.model");
const systemAccount_model_1 = require("../../modules/systemAccount/systemAccount.model");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const updateWalletBalance = (walletId, amount, type, session) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSenderWallet = yield wallet_model_1.Wallet.findByIdAndUpdate({ _id: walletId }, { $inc: { balance: type === 'add' ? amount : -amount } }, { new: true, session });
    if (!updatedSenderWallet) {
        throw new AppError_1.default(500, 'Failed to update wallet balance');
    }
    return updatedSenderWallet;
});
exports.updateWalletBalance = updateWalletBalance;
const updateSystemAccountBalance = (amount, type, session) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the system account
    const systemAccount = yield systemAccount_model_1.SystemAccount.findOne();
    if (!systemAccount) {
        throw new AppError_1.default(500, 'System account not found');
    }
    yield systemAccount_model_1.SystemAccount.findByIdAndUpdate(systemAccount._id, {
        $inc: {
            balance: type === 'add' ? amount : -amount,
            totalCommissionEarned: type === 'add' ? amount : 0,
        },
    }, { session });
});
exports.updateSystemAccountBalance = updateSystemAccountBalance;
