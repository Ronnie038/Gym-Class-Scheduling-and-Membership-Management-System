"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeValidation = void 0;
const zod_1 = require("zod");
// Enum for Gender, assuming the model uses Male, Female, and Other
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (Gender = {}));
// Zod validation schema for Trainee
const traineeValidationSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    trainee: zod_1.z
        .object({
        name: zod_1.z.string().min(3, 'Name must be at least 3 characters long'),
        email: zod_1.z.string().email('Invalid email address'),
        contactNo: zod_1.z
            .string()
            .min(10, 'Contact number must be at least 10 characters'),
        gender: zod_1.z
            .enum([Gender.Male, Gender.Female, Gender.Other], {
            errorMap: () => ({
                message: 'Gender must be Male, Female, or Other',
            }),
        })
            .optional(),
        dateOfBirth: zod_1.z.preprocess((val) => {
            if (typeof val === 'string')
                return new Date(val); // Convert string to Date
            return val;
        }, zod_1.z.date().refine((date) => !isNaN(date.getTime()), 'Invalid date')),
        address: zod_1.z
            .string()
            .min(5, 'Permanent address must be at least 5 characters')
            .optional(),
    })
        .strict(),
});
exports.TraineeValidation = {
    traineeValidationSchema,
};
