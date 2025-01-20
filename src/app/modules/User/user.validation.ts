import { z } from 'zod';

const userValidationSchema = z.object({
	email: z.string({ invalid_type_error: 'Email must be string' }).email(),
	password: z
		.string({ invalid_type_error: 'Password must be string' })
		.max(20, { message: 'Password can not be more than characters' })
		.optional(),
});

export const UserValidation = {
	userValidationSchema,
};
