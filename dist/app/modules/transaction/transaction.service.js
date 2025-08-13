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
exports.SendMoneyService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const wallet_model_1 = require("../wallet/wallet.model");
const transaction_types_1 = require("./transaction.types");
const transaction_model_1 = require("./transaction.model");
const systemAccount_model_1 = require("../systemAccount/systemAccount.model");
const commission_model_1 = require("../commission/commission.model");
const commission_types_1 = require("../commission/commission.types");
const updateBalance_1 = require("../../utils/transaction/updateBalance");
const validateTransaction_1 = require("../../utils/transaction/validateTransaction");
const handleSendMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, type } = payload;
    const { sender, senderWallet, receiverWallet, chargeAmount, totalAmount } = yield (0, validateTransaction_1.validateTransaction)(payload);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Updating balances
        const updatedSenderWallet = yield (0, updateBalance_1.updateWalletBalance)(senderWallet._id, totalAmount, 'remove', session);
        const updatedReceiverWallet = yield (0, updateBalance_1.updateWalletBalance)(receiverWallet._id, amount, 'add', session);
        // Create transaction record
        const transaction = yield new transaction_model_1.Transaction({
            senderWalletId: senderWallet._id,
            receiverWalletId: receiverWallet._id,
            amount,
            senderRole: sender.role,
            type,
            status: transaction_types_1.TransactionStatus.COMPLETED,
        }).save({ session });
        // System commission handling
        yield (0, updateBalance_1.updateSystemAccountBalance)(chargeAmount, 'add', session);
        yield new commission_model_1.Commission({
            transactionId: transaction._id,
            amount: chargeAmount,
            recipientType: commission_types_1.CommissionRecipientType.SYSTEM,
        }).save({ session });
        yield session.commitTransaction();
        return {
            transaction,
            meta: {
                senderBalance: updatedSenderWallet === null || updatedSenderWallet === void 0 ? void 0 : updatedSenderWallet.balance,
                receiverBalance: updatedReceiverWallet === null || updatedReceiverWallet === void 0 ? void 0 : updatedReceiverWallet.balance,
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(500, 'Transaction failed', error);
    }
    finally {
        yield session.endSession();
    }
});
const handleCashIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, type } = payload;
    const { sender, senderWallet, receiverWallet, commissionAmount, totalAmount } = yield (0, validateTransaction_1.validateTransaction)(payload);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update sender and receiver wallet balances
        const updatedSenderWallet = yield (0, updateBalance_1.updateWalletBalance)(senderWallet._id, totalAmount, 'remove', session);
        const updatedReceiverWallet = yield (0, updateBalance_1.updateWalletBalance)(receiverWallet._id, amount, 'add', session);
        // Create transaction record
        const transaction = yield new transaction_model_1.Transaction({
            senderWalletId: senderWallet._id,
            receiverWalletId: receiverWallet._id,
            amount,
            senderRole: sender.role,
            type,
            status: transaction_types_1.TransactionStatus.COMPLETED,
        }).save({ session });
        // System commission handling
        yield (0, updateBalance_1.updateSystemAccountBalance)(commissionAmount, 'remove', session);
        // agent commission handling
        yield (0, updateBalance_1.updateWalletBalance)(sender.commissionWallet, commissionAmount, 'add', session);
        yield new commission_model_1.Commission({
            transactionId: transaction._id,
            amount: commissionAmount,
            recipientType: commission_types_1.CommissionRecipientType.AGENT,
            recipientWalletId: sender.commissionWallet,
        }).save({ session });
        yield session.commitTransaction();
        return {
            transaction,
            meta: {
                senderBalance: updatedSenderWallet === null || updatedSenderWallet === void 0 ? void 0 : updatedSenderWallet.balance,
                receiverBalance: updatedReceiverWallet === null || updatedReceiverWallet === void 0 ? void 0 : updatedReceiverWallet.balance,
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(500, 'Transaction failed', error);
    }
    finally {
        yield session.endSession();
    }
});
const handleCashOut = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, type } = payload;
    const { sender, senderWallet, receiver, receiverWallet, chargeAmount, commissionAmount, totalAmount } = yield (0, validateTransaction_1.validateTransaction)(payload);
    // spiting commission between system and agent
    const systemCommission = chargeAmount - commissionAmount;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update balances
        const updatedSenderWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(senderWallet._id, { $inc: { balance: -totalAmount } }, { new: true, session });
        const updatedReceiverWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(receiverWallet._id, { $inc: { balance: amount } }, { new: true, session });
        // Create transaction record
        const transaction = yield new transaction_model_1.Transaction({
            senderWalletId: senderWallet._id,
            receiverWalletId: receiverWallet._id,
            amount,
            senderRole: sender.role,
            type,
            status: transaction_types_1.TransactionStatus.COMPLETED,
            chargeAmount,
            commissionAmount,
        }).save({ session });
        // Commission handling
        const systemAccount = yield systemAccount_model_1.SystemAccount.findOne();
        if (!systemAccount) {
            throw new AppError_1.default(500, 'System account not found');
        }
        // Updating commission balances
        // System commission
        yield systemAccount_model_1.SystemAccount.findByIdAndUpdate(systemAccount._id, { $inc: { balance: systemCommission } }, { session });
        // Agent commission
        yield wallet_model_1.Wallet.findByIdAndUpdate(receiver.commissionWallet, { $inc: { balance: commissionAmount } }, { session });
        // Saving commission records
        yield new commission_model_1.Commission({
            transactionId: transaction._id,
            amount: systemCommission,
            recipientType: commission_types_1.CommissionRecipientType.SYSTEM,
        }).save({ session });
        yield new commission_model_1.Commission({
            transactionId: transaction._id,
            amount: commissionAmount,
            recipientType: commission_types_1.CommissionRecipientType.AGENT,
            recipientWalletId: receiver.commissionWallet,
        }).save({ session });
        yield session.commitTransaction();
        return {
            transaction,
            meta: {
                senderBalance: updatedReceiverWallet === null || updatedReceiverWallet === void 0 ? void 0 : updatedReceiverWallet.balance,
                receiverBalance: updatedSenderWallet === null || updatedSenderWallet === void 0 ? void 0 : updatedSenderWallet.balance,
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(500, 'Transaction failed', error);
    }
    finally {
        yield session.endSession();
    }
});
const handleTopUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, rechargeNumber, senderWalletId } = payload;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update sender wallet balance
        const updatedSenderWallet = yield (0, updateBalance_1.updateWalletBalance)(senderWalletId, amount, 'remove', session);
        // getting system account info
        const systemAccount = yield systemAccount_model_1.SystemAccount.findOne();
        if (!systemAccount) {
            throw new AppError_1.default(500, 'System account not found');
        }
        // Update system account balance (this is for test purposes)
        yield systemAccount_model_1.SystemAccount.findByIdAndUpdate(systemAccount._id, { $inc: { balance: amount } }, { session });
        // Create transaction record
        const transaction = yield new transaction_model_1.Transaction({
            senderWalletId,
            receiverWalletId: systemAccount._id,
            amount,
            type: payload.type,
            status: transaction_types_1.TransactionStatus.COMPLETED,
            rechargeNumber,
        }).save({ session });
        yield session.commitTransaction();
        return {
            transaction,
            meta: {
                senderBalance: updatedSenderWallet === null || updatedSenderWallet === void 0 ? void 0 : updatedSenderWallet.balance,
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(500, 'Top-up failed', error);
    }
    finally {
        yield session.endSession();
    }
});
exports.SendMoneyService = {
    handleSendMoney,
    handleCashIn,
    handleCashOut,
    handleTopUp,
};
