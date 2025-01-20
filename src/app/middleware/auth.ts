import { NextFunction, Request, Response } from 'express';
// import { jwtHelpers } from "../../helpars/jwtHelpers";
import config from '../../config';
import { Secret } from 'jsonwebtoken';

import httpStatus from 'http-status';
import { jwtHelpers } from '../helpers/jwtHelper';
import { Role } from '@prisma/client';
import prisma from '../shared/prisma';

const auth = (...roles: string[]) => {
	return async (
		req: Request & { user?: any },
		res: Response,
		next: NextFunction
	) => {
		try {
			const token = req.headers.authorization;

			if (!token) {
				res.status(httpStatus.UNAUTHORIZED).json({
					success: false,
					message: 'Unauthorized access.',
					errorDetails: 'need valid accessToken with authorization header',
				});
				return;
			}

			const verifiedUser = jwtHelpers.verifyToken(
				token,
				config.jwt_access_secret as Secret
			);

			try {
				await prisma.user.findUnique({
					where: {
						email: verifiedUser.email,
						role: verifiedUser.role,
					},
				});
			} catch (error) {
				res.status(httpStatus.UNAUTHORIZED).json({
					success: false,
					message: 'Unauthorized access',
					errorDetails:
						'Please Login again and use accessToken with authorization header',
				});
			}
			req.user = verifiedUser;

			if (roles.length && !roles.includes(verifiedUser.role)) {
				if (verifiedUser.role === Role.ADMIN) {
					res.status(httpStatus.UNAUTHORIZED).json({
						success: false,
						message: 'Unauthorized access',
						errorDetails:
							'Admin do not have this permission to perform this action',
					});
				} else if (verifiedUser.role === Role.TRAINER) {
					res.status(httpStatus.UNAUTHORIZED).json({
						success: false,
						message: 'Unauthorized access',
						errorDetails:
							'Trainer do not have this permission to perform this action',
					});
				} else {
					res.status(httpStatus.UNAUTHORIZED).json({
						success: false,
						message: 'Unauthorized access',
						errorDetails: `You must be an ${roles.join()} to perform this action.`,
					});
				}
				return;
			}
			next();
		} catch (err) {
			console.log(err);
			res.status(httpStatus.UNAUTHORIZED).json({
				success: false,
				message: 'Unauthorized access',
				errorDetails:
					'your access token is invalid or expired, please login again and get a new access token with authorization header',
			});
			return;
		}
	};
};

export default auth;
