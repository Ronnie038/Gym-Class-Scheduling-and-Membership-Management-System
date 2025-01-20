"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const trainer_route_1 = require("../modules/trainer/trainer.route");
const shedule_route_1 = require("../modules/shedule/shedule.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/trainers',
        route: trainer_route_1.trainerRoutes,
    },
    {
        path: '/schedules',
        route: shedule_route_1.sheduleRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
// router.use('/students', studentRoute);
// router.use('/users', userRoutes);
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
