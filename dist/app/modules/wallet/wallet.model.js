"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    balance: { type: Number, default: 0 },
    isFrozen: { type: Boolean, default: false },
}, { timestamps: true });
exports.Wallet = (0, mongoose_1.model)('Wallet', walletSchema);
