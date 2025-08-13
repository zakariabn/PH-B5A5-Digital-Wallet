"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModelByRole = getUserModelByRole;
const AppError_1 = __importDefault(require("../helpers/AppError"));
const personal_model_1 = require("../modules/users/personal/personal.model");
const agent_model_1 = require("../modules/users/agent/agent.model");
const admin_model_1 = require("../modules/users/admin/admin.model");
const userBase_types_1 = require("../modules/users/shared/userBase/userBase.types");
function getUserModelByRole(role) {
    switch (role) {
        case userBase_types_1.Role.ADMIN:
            return admin_model_1.AdminUser;
        case userBase_types_1.Role.AGENT:
            return agent_model_1.AgentUser;
        case userBase_types_1.Role.PERSONAL:
            return personal_model_1.PersonalUser;
        default:
            throw new AppError_1.default(400, 'Invalid role');
    }
}
