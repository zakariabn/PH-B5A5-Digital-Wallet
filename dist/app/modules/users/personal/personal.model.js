"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalUser = void 0;
const mongoose_1 = require("mongoose");
const userBase_types_1 = require("../shared/userBase/userBase.types");
const userBase_model_1 = require("../shared/userBase/userBase.model");
const personalUserSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, userBase_model_1.userBaseFields), { role: { type: String, default: userBase_types_1.Role.PERSONAL }, wallet: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Wallet', required: true } }), { timestamps: true });
exports.PersonalUser = (0, mongoose_1.model)('PersonalUser', personalUserSchema);
