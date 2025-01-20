import { z } from 'zod';

// Define the Zod schema for Schedule
const createShedulValidation = z.object({
	trainerId: z.string().uuid(), // Validate UUID
	startTime: z.preprocess(
		(val) => {
			if (typeof val === 'string') return new Date(val); // Convert string to Date
			return val;
		},
		z.date().refine((date) => !isNaN(date.getTime()), 'Invalid date')
	),
	endTime: z.preprocess(
		(val) => {
			if (typeof val === 'string') return new Date(val); // Convert string to Date
			return val;
		},
		z.date().refine((date) => !isNaN(date.getTime()), 'Invalid date')
	),
	sessionDate: z.string().date().optional(), // Validate Date
});

export const sheduleValidations = {
	createShedulValidation,
};
