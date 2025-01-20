import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';

import sendResponse from '../../shared/sendResponse';
import prisma from '../../shared/prisma';
import { sheduleServices } from './shedule.service';

const createShedule = catchAsync(async (req: Request, res: Response) => {
	const result = await sheduleServices.createShedule(req, res);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Shedule create successfully',
		data: result,
	});
});
const getShedules = catchAsync(async (req: Request, res: Response) => {
	const result = await sheduleServices.getShedules();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'shedules retreived successfully',
		data: result,
	});
});

const getTrainerSchedules = catchAsync(async (req: Request, res: Response) => {
	const result = await sheduleServices.getTrainerSchedules(req);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Trainer retreived successfully',
		data: result,
	});
});

export const sheduleController = {
	getShedules,
	createShedule,
	getTrainerSchedules,
};
