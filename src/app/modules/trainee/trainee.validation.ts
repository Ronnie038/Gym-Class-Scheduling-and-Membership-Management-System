import { z } from 'zod';

// Enum for Gender, assuming the model uses Male, Female, and Other
enum Gender {
	Male = 'Male',
	Female = 'Female',
	Other = 'Other',
}

// Zod validation schema for Trainee
const traineeValidationSchema = z.object({
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	trainee: z
		.object({
			name: z.string().min(3, 'Name must be at least 3 characters long'),
			email: z.string().email('Invalid email address'),
			contactNo: z
				.string()
				.min(10, 'Contact number must be at least 10 characters'),
			gender: z
				.enum([Gender.Male, Gender.Female, Gender.Other], {
					errorMap: () => ({
						message: 'Gender must be Male, Female, or Other',
					}),
				})
				.optional(),
			dateOfBirth: z.preprocess(
				(val) => {
					if (typeof val === 'string') return new Date(val); // Convert string to Date
					return val;
				},
				z.date().refine((date) => !isNaN(date.getTime()), 'Invalid date')
			),
			address: z
				.string()
				.min(5, 'Permanent address must be at least 5 characters')
				.optional(),
		})
		.strict(),
});

export const TraineeValidation = {
	traineeValidationSchema,
};
