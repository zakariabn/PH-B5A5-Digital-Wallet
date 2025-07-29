import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

async function getSingleUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserServices.getSingleUser('dfadfa');

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully retrieved a user.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export const UserControllers = {
  getSingleUser,
};
