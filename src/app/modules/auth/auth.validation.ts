import { z } from 'zod';

// Define the Zod schema for Booking
const loginValidationSchema = z
	.object({
		email: z.string().email(),
		password: z.string(),
	})
	.strict();

// Export the schemas
export const loginValidations = {
	loginValidationSchema,
};
