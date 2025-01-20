import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { userServices } from './user.service';

const createTrainee = catchAsync(async (req, res) => {
	// @ts-ignore
	const traineeData = await userServices.createTrainee(req);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'trainee created successfully',
		data: traineeData,
	});
});

const createTrainer = catchAsync(async (req, res) => {
	// @ts-ignore
	const traineeData = await userServices.createTrainer(req);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'trainer created successfully',
		data: traineeData,
	});
});

export const userController = {
	createTrainee,
	createTrainer,
};
