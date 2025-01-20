import express from 'express';

import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { bookingController } from './booking.controller';
import validateRequest from '../../middleware/validateReques';
import { bookingValidations } from './booking.validation';

const router = express.Router();

// Route to get all trainers
router.post(
	'/',
	auth(Role.TRAINEE),
	validateRequest(bookingValidations.createBookingValidation),
	bookingController.createBooking
);
router.get('/', auth(Role.TRAINER, Role.ADMIN), bookingController.getBookings);

router.put(
	'/:id',
	auth(Role.ADMIN, Role.TRAINEE),
	bookingController.cancelBooking
);

router.get(
	'/get-trainee-bookings',
	auth(Role.TRAINEE),
	bookingController.getTraineeBookings
);

// Route to get a specific shedule by ID
router.get('/:id', bookingController.getBookingsByTraineeId);

export const bookingRoutes = router;
