import { Request, Response } from 'express';
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import { httpStatus } from '../../../config';
import { Schedule } from '@prisma/client';
import { formatDateToYYYYMMDD } from '../../utils/formateDate';

const createShedule = async (req: Request, res: Response) => {
	const scheduleData = req.body;
	let sessionDate;
	if (!scheduleData.sessionDate) {
		sessionDate = formatDateToYYYYMMDD();
	} else {
		sessionDate = formatDateToYYYYMMDD(scheduleData.sessionDate);
	}
	scheduleData.sessionDate = sessionDate;

	console.log(sessionDate);
	const countTodaySchedule = await prisma.schedule.count({
		where: {
			sessionDate: sessionDate,
		},
	});

	if (countTodaySchedule === 5) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'You can only create a maximum of 5 schedules per day.'
		);
	}

	try {
		await prisma.trainer.findUniqueOrThrow({
			where: {
				id: scheduleData.trainerId,
			},
		});
	} catch (error) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Trainer not found with this ');
	}

	const startTime = new Date(scheduleData.startTime);
	const endTime = new Date(scheduleData.endTime);
	const timeDifferenceInHours =
		(endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Difference in hours

	if (timeDifferenceInHours !== 2) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'The schedule duration must be exactly 2 hours.'
		);
	}

	// Check if schedule conflicts with existing schedules
	const conflictingSchedules = await prisma.schedule.findMany({
		where: {
			sessionDate: sessionDate,
			OR: [
				{
					startTime: { lt: startTime },
					endTime: { gt: startTime },
				},
				{
					startTime: { lt: endTime },
					endTime: { gt: endTime },
				},
				{
					startTime: { gt: startTime },
					endTime: { lt: endTime },
				},
				{
					startTime: { equals: startTime },
					endTime: { equals: endTime },
				},
			],
		},
	});

	if (conflictingSchedules.length > 0) {
		throw new ApiError(
			httpStatus.CONFLICT,
			'Schedule conflicts with an existing schedule check existing schedule'
		);
	}

	const shedule = await prisma.schedule.create({
		data: req.body,
	});

	if (!shedule) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Coudn't create shedule internel server error"
		);
	}

	return shedule;
};

const getShedules = async () => {
	const schedules = await prisma.schedule.findMany();

	if (!schedules) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Shedules not found');
	}

	return schedules;
};

const getTrainerSchedules = async (req: Request) => {
	const user = req.user;

	try {
		await prisma.user.findUniqueOrThrow({
			where: {
				email: user?.email,
				role: user?.role,
			},
		});
	} catch (error) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'Trainer not found please login again'
		);
	}

	const trainerData = await prisma.trainer.findUnique({
		where: { email: user?.email },
	});

	console.log(trainerData);
	const schedules = await prisma.schedule.findMany({
		where: {
			trainerId: trainerData?.id,
		},
	});

	return schedules;
};

export const sheduleServices = {
	createShedule,
	getShedules,
	getTrainerSchedules,
};
