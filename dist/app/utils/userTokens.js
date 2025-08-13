"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = createUserTokens;
/* eslint-disable @typescript-eslint/no-unused-vars */
const env_1 = require("../config/env");
const jwt_1 = require("./jwt");
function createUserTokens(user) {
    var _a;
    // jwt payload
    const jwtPayload = {
        userId: user._id,
        phone: user.phone,
        role: user.role,
        status: user.status,
        wallet: user.wallet,
        permissionLevel: (_a = user.permissionLevel) !== null && _a !== void 0 ? _a : undefined,
    };
    // jwt token
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.env.JWT_ACCESS_SECRET, env_1.env.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.env.JWT_REFRESH_SECRET, env_1.env.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken,
    };
}
