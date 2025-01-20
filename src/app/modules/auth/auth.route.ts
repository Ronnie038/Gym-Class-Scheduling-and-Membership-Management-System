import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateReques';
import { loginValidations } from './auth.validation';

const router = express.Router();

router.post(
	'/login',
	validateRequest(loginValidations.loginValidationSchema),
	AuthController.loginUser
);

export const AuthRoutes = router;
