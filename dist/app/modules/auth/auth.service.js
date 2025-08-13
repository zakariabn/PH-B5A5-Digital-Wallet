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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const getUserModel_1 = require("../../utils/getUserModel");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const hash_1 = require("../../utils/hash");
const userTokens_1 = require("../../utils/userTokens");
const credentialLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // role
    const role = payload.role;
    if (!role) {
        throw new AppError_1.default(400, 'Role not found in payload');
    }
    const Model = (0, getUserModel_1.getUserModelByRole)(role);
    const { phone, password } = payload;
    // user existence check
    const user = yield Model.findOne({ phone });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'User not found');
    }
    // password compare
    const isValidPassword = yield (0, hash_1.validateHash)(password, user.password);
    if (!isValidPassword) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Incorrect Password');
    }
    // creating user tokens
    const userTokens = (0, userTokens_1.createUserTokens)(user);
    // removing password form user data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = user.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest,
    };
});
exports.AuthService = {
    credentialLogin,
};
