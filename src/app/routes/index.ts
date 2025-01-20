import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { trainerRoutes } from '../modules/trainer/trainer.route';
import { sheduleRoutes } from '../modules/shedule/shedule.route';
import { bookingRoutes } from '../modules/booking/booking.route';
const router = Router();

const moduleRoutes = [
	{
		path: '/users',
		route: userRoutes,
	},
	{
		path: '/trainers',
		route: trainerRoutes,
	},
	{
		path: '/shedules',
		route: sheduleRoutes,
	},

	{
		path: '/bookings',
		route: bookingRoutes,
	},
	{
		path: '/auth',
		route: AuthRoutes,
	},
];

// router.use('/students', studentRoute);
// router.use('/users', userRoutes);

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
