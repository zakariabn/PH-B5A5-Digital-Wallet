import { Response } from 'express';

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export function setAuthCookie(res: Response, userInfo: AuthTokens) {
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
