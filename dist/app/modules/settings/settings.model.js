"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettings = void 0;
const mongoose_1 = require("mongoose");
const settingsSchema = new mongoose_1.Schema({
    transactionFeePercentage: { type: Number, default: 0 },
    cashInCommissionPercentage: { type: Number, default: 0 },
    cashOutCommissionPercentage: { type: Number, default: 0 },
    minimumBalance: { type: Number, default: 0 },
}, { timestamps: true });
exports.SystemSettings = (0, mongoose_1.model)('SystemSettings', settingsSchema);
