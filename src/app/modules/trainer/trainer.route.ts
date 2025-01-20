import express from 'express';
import { trainerController } from './trainer.controller';

const router = express.Router();

// Route to get all trainers
router.get('/', trainerController.getTrainers);

// Route to get a specific trainer by ID
router.get('/:id', trainerController.getTrainersById);

export const trainerRoutes = router;
