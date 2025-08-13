"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_types_1 = require("./transaction.types");
const transactionSchema = new mongoose_1.Schema({
    senderWalletId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Wallet',
        default: null,
    },
    receiverWalletId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Wallet',
        default: null,
    },
    amount: { type: Number, required: true },
    type: {
        type: String,
        enum: Object.values(transaction_types_1.TransactionType),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(transaction_types_1.TransactionStatus),
        default: transaction_types_1.TransactionStatus.PENDING,
    },
    failReason: { type: String },
    rechargeNumber: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
