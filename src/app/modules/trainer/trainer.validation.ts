import { z } from 'zod';

// Enum for Gender, assuming values as 'Male', 'Female', 'Other'
const Gender = z.enum(['Male', 'Female', 'Other']);

// Zod validation schema for the Trainer model
const createTrainerValidationSchema = z.object({
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	trainer: z
		.object({
			name: z.string().min(3, 'Name must be at least 3 characters long'), // Name is required and must be at least 3 characters
			email: z.string().email('Invalid email address'), // Email must be a valid email format
			gender: Gender, // Gender must be one of the values defined in the Gender enum
			contactNo: z
				.string()
				.min(10, 'Contact number must be at least 10 characters'), // Contact number must be at least 10 characters
			address: z.string().min(5, 'Address must be at least 5 characters long'), // Address must be at least 5 characters
			experienceYears: z.number().min(0, 'Experience years cannot be negative'), // Experience must be a non-negative number
		})
		.strict(),
});

export const trainerValidations = {
	createTrainerValidationSchema,
};
