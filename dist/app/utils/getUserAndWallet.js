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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAndWallet = void 0;
const AppError_1 = __importDefault(require("../helpers/AppError"));
const userBase_service_1 = require("../modules/users/shared/userBase/userBase.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const wallet_model_1 = require("../modules/wallet/wallet.model");
const getUserAndWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userBase_service_1.UserBaseService.findAnyUserByWalletId(walletId.toString());
    if (!user)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'User not found');
    // const wallet = user.wallet as unknown as IWallet & Document;
    const wallet = yield wallet_model_1.Wallet.findById(user.wallet);
    if (!wallet)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found');
    return [user, wallet];
});
exports.getUserAndWallet = getUserAndWallet;
