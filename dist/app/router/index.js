"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userBase_routes_1 = require("../modules/users/shared/userBase/userBase.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const transaction_routes_1 = require("../modules/transaction/transaction.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: userBase_routes_1.UserRouter,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRouter,
    },
    {
        path: '/transaction',
        route: transaction_routes_1.TransactionRouter,
    },
];
moduleRoutes.forEach(route => exports.router.use(route.path, route.route));
