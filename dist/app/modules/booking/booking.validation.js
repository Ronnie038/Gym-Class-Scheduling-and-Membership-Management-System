"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
// Define the Zod schema for Booking
const createBookingValidation = zod_1.z.object({
    scheduleId: zod_1.z
        .string()
        .uuid({ message: 'Invalid schedule ID format. Must be a valid UUID.' }),
});
// Export the schemas
exports.bookingValidations = {
    createBookingValidation,
};
