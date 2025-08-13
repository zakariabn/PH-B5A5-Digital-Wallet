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
exports.TransactionController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const transaction_service_1 = require("./transaction.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleSendMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_service_1.SendMoneyService.handleSendMoney(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Money sent successfully completed',
        data: result,
    });
}));
const handleCashIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_service_1.SendMoneyService.handleCashIn(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Cash In successfully completed',
        data: result,
    });
}));
const handleCashOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_service_1.SendMoneyService.handleCashOut(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Cash out successfully completed',
        data: result,
    });
}));
const handleTopUp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_service_1.SendMoneyService.handleTopUp(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Top-Up successfully completed',
        data: result,
    });
}));
exports.TransactionController = {
    handleSendMoney,
    handleCashIn,
    handleCashOut,
    handleTopUp,
};
