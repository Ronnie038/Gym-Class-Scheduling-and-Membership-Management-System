import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { bookingServices } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
	const result = await bookingServices.createBooking(req);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Booking created successfully',
		data: result,
	});
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
	const result = await bookingServices.getBookings(req.query);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Bookings retrieved successfully',
		data: result,
	});
});

const getBookingsByTraineeId = catchAsync(
	async (req: Request, res: Response) => {
		const result = await bookingServices.getBookings(req.query);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Booking retrieved successfully',
			data: result,
		});
	}
);

const getTraineeBookings = catchAsync(async (req: Request, res: Response) => {
	const result = await bookingServices.getTraineeBookings(req);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Bookings retrieved successfully',
		data: result,
	});
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
	const result = await bookingServices.cancelBooking(req);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Bookings cancelled successfully',
		data: result,
	});
});

export const bookingController = {
	createBooking,
	getBookings,
	getBookingsByTraineeId,
	getTraineeBookings,
	cancelBooking,
};
