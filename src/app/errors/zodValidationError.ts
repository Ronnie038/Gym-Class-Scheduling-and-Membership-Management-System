import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodErr = (err: ZodError): TGenericErrorResponse => {
	const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
		return {
			field: issue?.path[issue.path.length - 1],
			message: issue.message,
		};
	});

	const statusCode = 400;

	return {
		statusCode,
		message: 'Validation error occurred',
		errorSources,
	};
};

export default handleZodErr;
