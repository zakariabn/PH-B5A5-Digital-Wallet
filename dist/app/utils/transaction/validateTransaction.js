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
exports.validateTransaction = void 0;
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const calculateAmount_1 = require("../calculateAmount");
const getUserAndWallet_1 = require("../getUserAndWallet");
const validateTransactionRule_1 = require("./validateTransactionRule");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const validateTransaction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderWalletId, receiverWalletId, amount, type } = payload;
    if (!senderWalletId || !receiverWalletId) {
        throw new AppError_1.default(400, 'Sender and receiver wallet IDs are required');
    }
    if (!(amount > 0)) {
        throw new AppError_1.default(400, 'Amount must be a positive number');
    }
    const [sender, senderWallet] = yield (0, getUserAndWallet_1.getUserAndWallet)(senderWalletId);
    const [receiver, receiverWallet] = yield (0, getUserAndWallet_1.getUserAndWallet)(receiverWalletId);
    // sender wallet restriction check
    if (senderWallet.isFrozen) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Sender wallet is frozen.');
    }
    // receiver wallet restriction check
    if (receiverWallet.isFrozen) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Receiver wallet is frozen.');
    }
    if (senderWallet._id.equals(receiverWallet._id)) {
        throw new AppError_1.default(400, 'Sender and receiver wallets cannot be the same');
    }
    const { allowed, charge, commission } = (0, validateTransactionRule_1.validateTransactionRule)(sender.role, receiver.role, type);
    if (!allowed) {
        throw new AppError_1.default(403, `Transaction ${type} not allowed between ${sender.role} to ${receiver.role}`);
    }
    const chargeAmount = (0, calculateAmount_1.calculateAmount)(charge, amount);
    const commissionAmount = (0, calculateAmount_1.calculateAmount)(commission, amount);
    const totalAmount = amount + chargeAmount;
    if (senderWallet.balance < totalAmount) {
        throw new AppError_1.default(400, 'Insufficient balance in sender wallet');
    }
    return {
        sender,
        senderWallet,
        receiver,
        receiverWallet,
        chargeAmount,
        commissionAmount,
        totalAmount,
    };
});
exports.validateTransaction = validateTransaction;
