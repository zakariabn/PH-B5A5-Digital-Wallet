"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentUser = void 0;
// src/models/Agent.ts
const mongoose_1 = require("mongoose");
const userBase_types_1 = require("../shared/userBase/userBase.types");
const userBase_model_1 = require("../shared/userBase/userBase.model");
const agentUserSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, userBase_model_1.userBaseFields), { role: { type: String, default: userBase_types_1.Role.AGENT }, isApproved: { type: Boolean, default: false }, wallet: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Wallet', required: true }, commissionWallet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true,
    } }));
exports.AgentUser = (0, mongoose_1.model)('AgentUser', agentUserSchema);
