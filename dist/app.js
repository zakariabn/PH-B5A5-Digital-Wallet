"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./app/router");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// routes
app.use('/api/v1', router_1.router);
// root route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome To Digital Wallet API' });
});
// global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// 404/Not-found route
app.use(notFound_1.default);
exports.default = app;
