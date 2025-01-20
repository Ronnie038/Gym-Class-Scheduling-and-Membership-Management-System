import express from 'express';
import { sheduleController } from './shedule.controller';
import { trainerController } from '../trainer/trainer.controller';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';

const router = express.Router();

// Route to get all trainers
router.post('/', auth(Role.ADMIN), sheduleController.createShedule);
router.get('/', sheduleController.getShedules);

// Route to get a specific shedule by ID
// router.get('/:id', sheduleController.getShedules);
router.get(
	'/get-trainer-schedules',
	auth(Role.TRAINER),
	sheduleController.getTrainerSchedules
);

export const sheduleRoutes = router;
