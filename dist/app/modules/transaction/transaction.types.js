"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiatorModel = exports.TransactionStatus = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["TOP_UP"] = "TOP_UP";
    TransactionType["WITHDRAW"] = "WITHDRAW";
    TransactionType["SEND"] = "SEND";
    TransactionType["CASH_IN"] = "CASH_IN";
    TransactionType["CASH_OUT"] = "CASH_OUT";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["CANCELLED"] = "CANCELLED";
    TransactionStatus["REVERSED"] = "REVERSED";
    TransactionStatus["COMPLETED"] = "COMPLETED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var InitiatorModel;
(function (InitiatorModel) {
    InitiatorModel["USER"] = "User";
    InitiatorModel["AGENT"] = "Agent";
    InitiatorModel["ADMIN"] = "Admin";
})(InitiatorModel || (exports.InitiatorModel = InitiatorModel = {}));
