import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import handleZodErr from '../errors/zodValidationError';
import { ZodError, ZodIssue } from 'zod';
import handlePrismaClientValidationError from '../errors/prismaClientValidationError';
const globalErrorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = httpStatus.INTERNAL_SERVER_ERROR || err?.statusCode;
	let success = false;
	let message = err.message || 'Something went wrong!';
	let errorDetails = err;

	if (err instanceof ZodError) {
		const simplifiedError = handleZodErr(err);
		message = simplifiedError?.message;
		errorDetails = simplifiedError?.errorSources;
	}
	if (err instanceof Prisma.PrismaClientValidationError) {
		const simplifiedError = handlePrismaClientValidationError(err);
		message = simplifiedError?.message;
		errorDetails = simplifiedError?.errorSources;
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2002') {
			message = 'Duplicate Key error';
			errorDetails = err.meta;
		}
	}

	res.status(statusCode).json({
		success,
		message,
		errorDetails,
	});
};

export default globalErrorHandler;
