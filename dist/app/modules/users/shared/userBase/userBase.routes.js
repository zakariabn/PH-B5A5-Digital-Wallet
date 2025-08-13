"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const personal_routes_1 = require("../../personal/personal.routes");
const personal_routes_2 = require("../../agent/personal.routes");
const admin_routes_1 = require("../../admin/admin.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/admin',
        route: admin_routes_1.AdminRouter,
    },
    {
        path: '/agent',
        route: personal_routes_2.AgentRouter,
    },
    {
        path: '/personal',
        route: personal_routes_1.PersonalRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.UserRouter = router;
