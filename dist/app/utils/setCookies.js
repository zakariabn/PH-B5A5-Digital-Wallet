"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = setAuthCookie;
function setAuthCookie(res, userInfo) {
    // for access token
    if (userInfo.accessToken) {
        res.cookie('accessToken', userInfo.accessToken, {
            httpOnly: true,
            secure: false,
        });
    }
    // for refresh token
    if (userInfo.refreshToken) {
        res.cookie('refreshToken', userInfo.refreshToken, {
            httpOnly: true,
            secure: false,
        });
    }
}
