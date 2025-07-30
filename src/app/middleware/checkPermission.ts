import { Request, Response, NextFunction } from 'express';
import { Permission, rolePermissions } from '../utils/rolePermissions';
import AppError from '../helpers/AppError';
import httpStatus from 'http-status-codes';
import { IUserAuthenticatedPayload } from '../modules/user/user.types';

type PermissionOrArray = Permission | Permission[];

export const checkPermission = (required: PermissionOrArray) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUserAuthenticatedPayload;

    if (!user) {
      return next(new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found in checkPermission'));
    }

    if (!user.role) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized: No role found' });
    }

    const rolePerms = rolePermissions[user.role];

    // Ensure we work with an array
    const requiredPermissions = Array.isArray(required) ? required : [required];

    const hasPermission = requiredPermissions.every(perm => rolePerms?.[perm]);

    if (!hasPermission) {
      return res.status(httpStatus.FORBIDDEN).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};
