import { z } from 'zod';

// Define the Zod schema for Booking
const createBookingValidation = z.object({
	scheduleId: z
		.string()
		.uuid({ message: 'Invalid schedule ID format. Must be a valid UUID.' }),
});

// Export the schemas
export const bookingValidations = {
	createBookingValidation,
};
