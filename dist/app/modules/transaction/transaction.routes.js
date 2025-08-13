"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middleware/validateRequest");
const transaction_controllers_1 = require("./transaction.controllers");
const transaction_validate_1 = require("./transaction.validate");
const checkAuth_1 = require("../../middleware/checkAuth");
const userBase_types_1 = require("../users/shared/userBase/userBase.types");
const router = (0, express_1.Router)();
router.post('/send', (0, validateRequest_1.validateRequest)(transaction_validate_1.sendMonyZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.AGENT, userBase_types_1.Role.PERSONAL), transaction_controllers_1.TransactionController.handleSendMoney);
router.post('/cash-in', (0, validateRequest_1.validateRequest)(transaction_validate_1.cashInZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.AGENT), transaction_controllers_1.TransactionController.handleCashIn);
router.post('/cash-out', (0, validateRequest_1.validateRequest)(transaction_validate_1.cashOutZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.PERSONAL), transaction_controllers_1.TransactionController.handleCashOut);
router.post('/top-up', (0, validateRequest_1.validateRequest)(transaction_validate_1.topUpZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.PERSONAL, userBase_types_1.Role.AGENT), transaction_controllers_1.TransactionController.handleTopUp);
exports.TransactionRouter = router;
// route > controller > services -> (user) -> controller -> user_details,access_token,refresh_token
