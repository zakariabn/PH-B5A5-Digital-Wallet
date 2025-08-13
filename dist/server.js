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
/* eslint-disable no-console */
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./app/config/env");
const seedAccountAndSupeAdmin_1 = require("./app/utils/seedAccountAndSupeAdmin");
// import { seedSuperAdmin } from './app/utils/seedSuperAdmin';
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.env.MONGO_URI);
        console.log('✅ Connected to database.');
        server = app_1.default.listen(env_1.env.PORT, () => {
            console.log('✅ Server is listening to port', env_1.env.PORT);
        });
    }
    catch (error) {
        console.log('❌ Something went wrong, failed to start server\n', error);
    }
});
// ...
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, seedAccountAndSupeAdmin_1.seedSystemAccount)();
    yield (0, seedAccountAndSupeAdmin_1.seedSuperAdmin)();
}))();
// server error handling
// Promise.reject(new Error("error happend"));
// throw new Error("Uncaught handle error");
// throw new Error("Uncaught handle error");
// terminate signal handling
process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM signal received... server shutting down.');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// local terminate signal handling
process.on('SIGINT', () => {
    console.log('⚠️  SIGINT signal received... server shutting down.');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// unhandled rejection error handling
process.on('unhandledRejection', err => {
    console.log('⚠️  Unhandled Rejection detected... server shutting down.', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// uncaught error handling
process.on('uncaughtException', err => {
    console.log('⚠️  Uncaught Exception Rejection detected... server shutting down.', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
