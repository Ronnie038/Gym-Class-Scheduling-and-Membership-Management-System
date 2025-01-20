import { Request } from 'express';
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import { httpStatus } from '../../../config';
import { formatDateToYYYYMMDD } from '../../utils/formateDate';

const createBooking = async (req: Request) => {
	const data = req.body;
	const user = req.user;
	const trainee = await prisma.trainee.findUnique({
		where: { email: user?.email },
	});
	// Check if the booking already exists
	if (!trainee) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'trainee could not be found');
	}
	const existingBooking = await prisma.booking.findFirst({
		where: {
			traineeId: trainee.id,
			scheduleId: data.scheduleId,
		},
	});

	if (existingBooking) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Booking already exists for this schedule and trainee.'
		);
	}

	// Check if the schedule has reached the booking limit
	const bookingCount = await prisma.booking.count({
		where: {
			scheduleId: data.scheduleId,
		},
	});

	if (bookingCount >= 10) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'This schedule has reached the maximum booking limit of 10.'
		);
	}

	// Create the booking
	const booking = await prisma.booking.create({
		data: {
			traineeId: trainee.id,
			scheduleId: data.scheduleId,
			bookingDate: formatDateToYYYYMMDD(),
		},
	});

	return booking;
};

const getBookings = async (query: any) => {
	const { traineeId, scheduleId } = query;

	const filters: any = {};
	if (traineeId) filters.traineeId = traineeId;
	if (scheduleId) filters.scheduleId = scheduleId;

	const bookings = await prisma.booking.findMany({
		where: filters,
		include: {
			trainee: true,
			schedule: true,
		},
	});

	return bookings;
};

const getTraineeBookings = async (req: Request) => {
	const user = req.user;
	const trainee = await prisma.trainee.findUnique({
		where: { email: user?.email },
	});
	if (!trainee) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'trainee could not be found');
	}
	const bookings = await getBookings({ traineeId: trainee.id });

	if (!bookings) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Bookings not found');
	}
	return bookings;
};

const cancelBooking = async (req: Request) => {
	const bookingId = req?.params?.id;

	const booking = await prisma.booking.findUniqueOrThrow({
		where: { id: bookingId },
	});

	try {
		await prisma.booking.findUniqueOrThrow({
			where: { id: bookingId },
		});
	} catch (error) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
	}

	await prisma.booking.delete({ where: { id: bookingId } });
	return booking;
};
export const bookingServices = {
	createBooking,
	getBookings,
	getTraineeBookings,
	cancelBooking,
};
