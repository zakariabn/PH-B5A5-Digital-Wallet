"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    var _a;
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: (_a = data.meta) !== null && _a !== void 0 ? _a : data.meta,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
