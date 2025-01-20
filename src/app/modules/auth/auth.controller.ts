import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../shared/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
	const result = await AuthServices.loginUser(req.body);

	const { accessToken } = result;

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Logged in successfully!',
		data: {
			accessToken,
		},
	});
});

export const AuthController = {
	loginUser,
};
