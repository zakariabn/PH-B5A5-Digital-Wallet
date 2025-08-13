"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../../middleware/validateRequest");
const userBase_validate_1 = require("../shared/userBase/userBase.validate");
const admin_controller_1 = require("./admin.controller");
const userBase_types_1 = require("../shared/userBase/userBase.types");
const checkAuth_1 = require("../../../middleware/checkAuth");
const admin_validate_1 = require("./admin.validate");
const router = (0, express_1.Router)();
// create admin
router.post('/register', (0, validateRequest_1.validateRequest)(userBase_validate_1.userBaseZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.ADMIN), admin_controller_1.AdminUserController.createAdminUser);
// view data
router.get('/get-users', (0, checkAuth_1.checkAuth)(userBase_types_1.Role.ADMIN), admin_controller_1.AdminUserController.viewUsers);
router.get('/get-wallets', (0, checkAuth_1.checkAuth)(userBase_types_1.Role.ADMIN), admin_controller_1.AdminUserController.viewWallets);
router.get('/get-transactions', (0, checkAuth_1.checkAuth)(userBase_types_1.Role.ADMIN), admin_controller_1.AdminUserController.viewTransactions);
//update route
router.patch('/manage-agent', (0, validateRequest_1.validateRequest)(admin_validate_1.manageAgentZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.ADMIN), admin_controller_1.AdminUserController.manageAgent);
router.patch('/update-wallet', (0, validateRequest_1.validateRequest)(admin_validate_1.updateWalletStatusZodSchema), (0, checkAuth_1.checkAuth)(userBase_types_1.Role.ADMIN), admin_controller_1.AdminUserController.updateWalletStatus);
exports.AdminRouter = router;
