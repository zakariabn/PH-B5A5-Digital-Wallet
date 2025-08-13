"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemAccount = void 0;
const mongoose_1 = require("mongoose");
const systemAccountSchema = new mongoose_1.Schema({
    balance: { type: Number, default: 0 },
    totalInvestment: { type: Number, default: 0 },
    totalWithdrawal: { type: Number, default: 0 },
    totalCommissionEarned: { type: Number, default: 0 },
}, { timestamps: true });
exports.SystemAccount = (0, mongoose_1.model)('SystemAccount', systemAccountSchema);
