"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(statusCode, message, stack) {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
