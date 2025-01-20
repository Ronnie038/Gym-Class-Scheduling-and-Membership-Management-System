import { Prisma } from '@prisma/client';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { error } from 'console';

const handlePrismaClientValidationError = (
	err: Prisma.PrismaClientValidationError
): TGenericErrorResponse => {
	// console.log(err);
	const errorSources: TErrorSources = err.message

		.split('\n')
		.filter((ele) => {
			if (ele.includes('Argument')) {
				return ele;
			}
		})
		.map((elem) => {
			return {
				field: elem.split(' ')[1],
				message: elem
					.split(' ')
					.filter((el) => el !== 'Argument')
					.join(),
			};
		});

	const statusCode = 400;

	return {
		statusCode,
		message: 'validation error occurred',
		errorSources,
	};
};

export default handlePrismaClientValidationError;
