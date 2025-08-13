"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commission = void 0;
const mongoose_1 = require("mongoose");
const commission_types_1 = require("./commission.types");
const commissionSchema = new mongoose_1.Schema({
    transactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Transaction',
    },
    recipientType: {
        type: String,
        enum: Object.values(commission_types_1.CommissionRecipientType),
        required: true,
    },
    recipientWalletId: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: 'Agent',
        required: false,
    },
    amount: { type: Number, required: true, min: 0 },
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.Commission = (0, mongoose_1.model)('commission', commissionSchema);
