import { z } from 'zod';

// Define the Zod schema for Schedule
const createShedulValidation = z.object({
	trainerId: z.string().uuid(), // Validate UUID
	startTime: z.string().date(), // Validate DateTime
	endTime: z.string().date(), // Validate DateTime
	sessionDate: z.string().date().optional(), // Validate Date
});

export const sheduleValidations = {
	createShedulValidation,
};
