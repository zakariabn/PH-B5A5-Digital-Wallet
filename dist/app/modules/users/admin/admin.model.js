"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = void 0;
const mongoose_1 = require("mongoose");
const userBase_types_1 = require("../shared/userBase/userBase.types");
const userBase_model_1 = require("../shared/userBase/userBase.model");
const admin_types_1 = require("./admin.types");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { wallet } = userBase_model_1.userBaseFields, userBaseWithoutWalletField = __rest(userBase_model_1.userBaseFields, ["wallet"]);
const adminUserSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, userBaseWithoutWalletField), { role: { type: String, default: userBase_types_1.Role.ADMIN }, permissionLevel: { type: Number, default: admin_types_1.PermissionLevel.ADMIN } }), { timestamps: true });
exports.AdminUser = (0, mongoose_1.model)('AdminUser', adminUserSchema);
