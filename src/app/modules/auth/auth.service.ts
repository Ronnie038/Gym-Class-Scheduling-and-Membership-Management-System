import { Status, UserStatus } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import config, { httpStatus } from '../../../config';
import { Secret } from 'jsonwebtoken';

import prisma from '../../shared/prisma';
import { jwtHelpers } from '../../helpers/jwtHelper';
import ApiError from '../../errors/ApiError';

const loginUser = async (payload: { email: string; password: string }) => {
	let userData;

	try {
		userData = await prisma.user.findUniqueOrThrow({
			where: {
				email: payload.email,
				status: Status.active,
			},
		});
	} catch (error) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'User not found with this email ' + payload.email
		);
	}

	console.log(userData);
	const isCorrectPassword: boolean = await bcrypt.compare(
		payload.password,
		userData.password
	);

	if (!isCorrectPassword) {
		throw new Error('Password incorrect!');
	}
	const accessToken = jwtHelpers.generateToken(
		{
			email: userData.email,
			role: userData.role,
		},
		config.jwt_access_secret as Secret,
		config.jwt_access_expires_in as string
	);

	const refreshToken = jwtHelpers.generateToken(
		{
			email: userData.email,
			role: userData.role,
		},
		config.jwt_access_secret as Secret,
		config.jwt_access_expires_in as string
	);

	return {
		accessToken,
		refreshToken,
	};
};

export const AuthServices = {
	loginUser,
};
