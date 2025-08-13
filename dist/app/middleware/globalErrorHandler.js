"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const env_1 = require("../config/env");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const handlerZodError_1 = require("../helpers/errorHelpers/handlerZodError");
const AppError_1 = __importDefault(require("../helpers/AppError"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function globalErrorHandler(err, req, res, next) {
    if (env_1.env.NODE_ENV !== 'production') {
        console.log(err);
    }
    let errorSources = [];
    let statusCode = 500;
    let message = 'Something Went Wrong!';
    if (err.name === 'ZodError') {
        const simplifiedError = (0, handlerZodError_1.handlerZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    //
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // last if above handler doesn't catch
    else if (err instanceof Error) {
        statusCode = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.env.NODE_ENV === 'development' ? err : null,
        stack: env_1.env.NODE_ENV === 'development' ? err.stack : null,
    });
}
