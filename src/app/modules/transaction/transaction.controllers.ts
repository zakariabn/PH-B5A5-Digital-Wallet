/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SendMoneyService } from './transaction.service';
import { sendResponse } from '../../utils/sendResponse';

const handleSendMoney = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await SendMoneyService.handleSendMoney(req.body);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: 'Money sent successfully completed',
		data: result,
	});
});

const handleCashIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await SendMoneyService.handleCashIn(req.body);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: 'Cash In successfully completed',
		data: result,
	});
});

const handleCashOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await SendMoneyService.handleCashOut(req.body);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: 'Cash out successfully completed',
		data: result,
	});
});

const handleTopUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const result = await SendMoneyService.handleTopUp(req.body);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: 'Top-Up successfully completed',
		data: result,
	});
});

export const TransactionController = {
	handleSendMoney,
	handleCashIn,
	handleCashOut,
	handleTopUp,
};
