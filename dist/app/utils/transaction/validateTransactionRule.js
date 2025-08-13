"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransactionRule = validateTransactionRule;
const transaction_types_1 = require("../../modules/transaction/transaction.types");
const userBase_types_1 = require("../../modules/users/shared/userBase/userBase.types");
const transactionRules = [
    // Agent ↔ Personal
    {
        from: userBase_types_1.Role.AGENT,
        to: userBase_types_1.Role.PERSONAL,
        type: transaction_types_1.TransactionType.CASH_IN,
        allowed: true,
        commission: { value: 0.4, type: 'percentage' },
    },
    // Agent ↔ Agent
    {
        from: userBase_types_1.Role.AGENT,
        to: userBase_types_1.Role.AGENT,
        type: transaction_types_1.TransactionType.SEND,
        allowed: true,
    },
    // Personal ↔ Agent
    {
        from: userBase_types_1.Role.PERSONAL,
        to: userBase_types_1.Role.AGENT,
        type: transaction_types_1.TransactionType.CASH_OUT,
        allowed: true,
        charge: { value: 1.85, type: 'percentage' },
        commission: { value: 0.4, type: 'percentage' },
    },
    // Personal ↔ Personal
    {
        from: userBase_types_1.Role.PERSONAL,
        to: userBase_types_1.Role.PERSONAL,
        type: transaction_types_1.TransactionType.SEND,
        allowed: true,
        charge: { value: 5, type: 'fixed' },
    },
    // Admin ↔ Agent
    {
        from: userBase_types_1.Role.ADMIN,
        to: userBase_types_1.Role.AGENT,
        type: transaction_types_1.TransactionType.SEND,
        allowed: true,
    },
    // Agent ↔  Admin
    {
        from: userBase_types_1.Role.AGENT,
        to: userBase_types_1.Role.ADMIN,
        type: transaction_types_1.TransactionType.WITHDRAW,
        allowed: true,
    },
];
function validateTransactionRule(from, to, type) {
    var _a;
    const rule = transactionRules.find(r => r.from.toLowerCase() === from.toLowerCase() &&
        r.to.toLowerCase() === to.toLowerCase() &&
        r.type.toLowerCase() === type.toLowerCase());
    return {
        allowed: (_a = rule === null || rule === void 0 ? void 0 : rule.allowed) !== null && _a !== void 0 ? _a : false,
        charge: rule === null || rule === void 0 ? void 0 : rule.charge,
        commission: rule === null || rule === void 0 ? void 0 : rule.commission,
    };
}
