"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBaseService = void 0;
const admin_model_1 = require("../../admin/admin.model");
const agent_model_1 = require("../../agent/agent.model");
const personal_model_1 = require("../../personal/personal.model");
const findAnyUserByPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield admin_model_1.AdminUser.findOne({ phone })) || (yield agent_model_1.AgentUser.findOne({ phone })) || (yield personal_model_1.PersonalUser.findOne({ phone }));
    return user;
});
const findAnyUserByWalletId = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const user = (yield agent_model_1.AgentUser.findOne({ wallet: walletId })) || (yield personal_model_1.PersonalUser.findOne({ wallet: walletId }));
    return user;
});
exports.UserBaseService = {
    findAnyUserByPhone,
    findAnyUserByWalletId,
};
