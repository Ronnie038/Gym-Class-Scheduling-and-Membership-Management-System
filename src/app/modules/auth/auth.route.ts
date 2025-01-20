import express from 'express';
import { AuthController } from './auth.controller';

import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/login', AuthController.loginUser);

export const AuthRoutes = router;
