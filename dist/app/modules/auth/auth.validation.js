"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidations = void 0;
const zod_1 = require("zod");
// Define the Zod schema for Booking
const loginValidationSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
})
    .strict();
// Export the schemas
exports.loginValidations = {
    loginValidationSchema,
};
