"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAmount = void 0;
const calculateAmount = (fee, base = 0) => {
    if (!fee)
        return 0;
    return fee.type === 'percentage' ? (base * fee.value) / 100 : fee.value;
};
exports.calculateAmount = calculateAmount;
