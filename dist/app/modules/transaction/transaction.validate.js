"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topUpZodSchema = exports.cashInZodSchema = exports.cashOutZodSchema = exports.sendMonyZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const transaction_types_1 = require("./transaction.types");
const commonTransactionFieldsShape = {
    senderWalletId: zod_1.default.string().min(1, 'Sender ID is required'),
    receiverWalletId: zod_1.default.string().min(1, 'Receiver ID is required'),
    amount: zod_1.default.number().positive('Amount must be a positive number'),
    reference: zod_1.default.string().optional(),
};
const commonTransactionFieldsZodSchema = zod_1.default.object(commonTransactionFieldsShape);
exports.sendMonyZodSchema = zod_1.default.object(Object.assign(Object.assign({}, commonTransactionFieldsShape), { type: zod_1.default.literal(transaction_types_1.TransactionType.SEND, 'Transaction type is required'), amount: zod_1.default.number().positive('Amount must be a positive number') }));
exports.cashOutZodSchema = zod_1.default.object(Object.assign(Object.assign({}, commonTransactionFieldsShape), { type: zod_1.default.literal(transaction_types_1.TransactionType.CASH_OUT, 'Transaction type is required'), amount: zod_1.default.number().positive('Amount must be a positive number') }));
exports.cashInZodSchema = zod_1.default.object(Object.assign(Object.assign({}, commonTransactionFieldsShape), { type: zod_1.default.literal(transaction_types_1.TransactionType.CASH_IN, 'Transaction type is required'), amount: zod_1.default.number().positive('Amount must be a positive number') }));
exports.topUpZodSchema = commonTransactionFieldsZodSchema
    .omit({
    receiverWalletId: true,
})
    .extend({
    type: zod_1.default.literal(transaction_types_1.TransactionType.TOP_UP, 'Transaction type must be TOP_UP'),
    rechargeNumber: zod_1.default.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
        message: 'Invalid Bangladeshi phone number',
    }),
});
