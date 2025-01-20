import express from 'express';

import { USER_ROLE } from './user.constant';
import validateRequest from '../../middleware/validateReques';
import { TraineeValidation } from '../trainee/trainee.validation';
import { userController } from './user.controller';
import { trainerValidations } from '../trainer/trainer.validation';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
	'/create-trainee',
	validateRequest(TraineeValidation.traineeValidationSchema),
	userController.createTrainee
);

router.post(
	'/create-trainer',
	auth(Role.ADMIN),
	validateRequest(trainerValidations.createTrainerValidationSchema),
	userController.createTrainer
);

export const userRoutes = router;
