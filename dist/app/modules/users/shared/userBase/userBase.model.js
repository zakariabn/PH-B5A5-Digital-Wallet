"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBaseFields = void 0;
// src/models/shared/userBaseFields.ts
const mongoose_1 = require("mongoose");
const userBase_types_1 = require("./userBase.types");
exports.userBaseFields = {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: Object.values(userBase_types_1.Status), default: userBase_types_1.Status.ACTIVE },
    wallet: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Wallet', required: true },
};
