import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { Role, Trainee, Trainer } from '@prisma/client';
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
const createTrainee = async (req: Request) => {
	// @ts-ignore
	const { password, trainee } = req.body;
	const hashedPassword: string = await bcrypt.hash(password, 12);

	const userData = {
		email: trainee.email,
		password: hashedPassword,
		role: Role.TRAINEE,
	};

	const axistingUser = await prisma.user.findUnique({
		where: {
			email: userData.email,
		},
	});
	if (axistingUser) {
		throw new ApiError(409, 'User already exists with this email');
	}
	const result = await prisma.$transaction(async (transactionClient) => {
		await transactionClient.user.create({
			data: userData,
		});

		const traineeData: Trainee = {
			...trainee,
			dateOfBirth: new Date(trainee.dateOfBirth),
			// @ts-ignore
		};

		const createdTraineeData = await transactionClient.trainee.create({
			data: traineeData,
		});

		return createdTraineeData;
	});

	return result;
};
const createTrainer = async (req: Request) => {
	// @ts-ignore
	const { password, trainer } = req.body;
	const hashedPassword: string = await bcrypt.hash(password, 12);

	const userData = {
		email: trainer.email,
		password: hashedPassword,
		role: Role.TRAINER,
	};

	const axistingUser = await prisma.user.findUnique({
		where: {
			email: userData.email,
		},
	});
	if (axistingUser) {
		throw new ApiError(409, 'User already exists with this email');
	}
	const result = await prisma.$transaction(async (transactionClient) => {
		await transactionClient.user.create({
			data: userData,
		});

		const trainerData: Trainer = {
			...trainer,
			// @ts-ignore
		};

		const createdTraineeData = await transactionClient.trainer.create({
			data: trainerData,
		});

		return createdTraineeData;
	});

	return result;
};

export const userServices = {
	createTrainee,
	createTrainer,
};
