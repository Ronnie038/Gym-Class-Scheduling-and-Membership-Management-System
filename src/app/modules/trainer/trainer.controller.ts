import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';

import sendResponse from '../../shared/sendResponse';
import prisma from '../../shared/prisma';
import { trainerServices } from './trainer.service';

const getTrainers = catchAsync(async (req: Request, res: Response) => {
	const result = await trainerServices.getTrainers();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Trainers retreived successfully',
		data: result,
	});
});
const getTrainersById = catchAsync(async (req: Request, res: Response) => {
	const result = await trainerServices.getTrainerById();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Trainer retreived successfully',
		data: result,
	});
});

export const trainerController = {
	getTrainers,
	getTrainersById,
};
