"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const booking_controller_1 = require("./booking.controller");
const validateReques_1 = __importDefault(require("../../middleware/validateReques"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
// Route to get all trainers
router.post('/', (0, auth_1.default)(client_1.Role.TRAINEE), (0, validateReques_1.default)(booking_validation_1.bookingValidations.createBookingValidation), booking_controller_1.bookingController.createBooking);
router.get('/', (0, auth_1.default)(client_1.Role.TRAINER, client_1.Role.ADMIN), booking_controller_1.bookingController.getBookings);
router.put('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.TRAINEE), booking_controller_1.bookingController.cancelBooking);
router.get('/get-trainee-bookings', (0, auth_1.default)(client_1.Role.TRAINEE), booking_controller_1.bookingController.getTraineeBookings);
// Route to get a specific shedule by ID
exports.bookingRoutes = router;
