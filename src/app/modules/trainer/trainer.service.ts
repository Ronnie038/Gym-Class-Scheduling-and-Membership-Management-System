import { httpStatus } from '../../../config';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';

const getTrainers = async () => {
	const trainers = await prisma.trainer.findMany();

	if (!trainers) {
		throw new ApiError(httpStatus.NOT_FOUND, 'No trainers found.');
	}

	return trainers;
};
const getTrainerById = async () => {};

export const trainerServices = {
	getTrainers,
	getTrainerById,
};
