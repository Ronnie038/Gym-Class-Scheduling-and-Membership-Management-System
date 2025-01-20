"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheduleValidations = void 0;
const zod_1 = require("zod");
// Define the Zod schema for Schedule
const createShedulValidation = zod_1.z.object({
    trainerId: zod_1.z.string().uuid(), // Validate UUID
    startTime: zod_1.z.preprocess((val) => {
        if (typeof val === 'string')
            return new Date(val); // Convert string to Date
        return val;
    }, zod_1.z.date().refine((date) => !isNaN(date.getTime()), 'Invalid date')),
    endTime: zod_1.z.preprocess((val) => {
        if (typeof val === 'string')
            return new Date(val); // Convert string to Date
        return val;
    }, zod_1.z.date().refine((date) => !isNaN(date.getTime()), 'Invalid date')),
    sessionDate: zod_1.z.string().date().optional(), // Validate Date
});
exports.sheduleValidations = {
    createShedulValidation,
};
