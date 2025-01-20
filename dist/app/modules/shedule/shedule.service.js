"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheduleServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const config_1 = require("../../../config");
const formateDate_1 = require("../../utils/formateDate");
const createShedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleData = req.body;
    let sessionDate;
    if (!scheduleData.sessionDate) {
        sessionDate = (0, formateDate_1.formatDateToYYYYMMDD)();
    }
    else {
        sessionDate = (0, formateDate_1.formatDateToYYYYMMDD)(scheduleData.sessionDate);
    }
    scheduleData.sessionDate = sessionDate;
    console.log(sessionDate);
    const countTodaySchedule = yield prisma_1.default.schedule.count({
        where: {
            sessionDate: sessionDate,
        },
    });
    if (countTodaySchedule === 5) {
        throw new ApiError_1.default(config_1.httpStatus.BAD_REQUEST, 'You can only create a maximum of 5 schedules per day.');
    }
    try {
        yield prisma_1.default.trainer.findUniqueOrThrow({
            where: {
                id: scheduleData.trainerId,
            },
        });
    }
    catch (error) {
        throw new ApiError_1.default(config_1.httpStatus.BAD_REQUEST, 'Trainer not found with this ');
    }
    const startTime = new Date(scheduleData.startTime);
    const endTime = new Date(scheduleData.endTime);
    const timeDifferenceInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Difference in hours
    if (timeDifferenceInHours !== 2) {
        throw new ApiError_1.default(config_1.httpStatus.BAD_REQUEST, 'The schedule duration must be exactly 2 hours.');
    }
    // Check if schedule conflicts with existing schedules
    const conflictingSchedules = yield prisma_1.default.schedule.findMany({
        where: {
            sessionDate: sessionDate,
            OR: [
                {
                    startTime: { lt: startTime },
                    endTime: { gt: startTime },
                },
                {
                    startTime: { lt: endTime },
                    endTime: { gt: endTime },
                },
                {
                    startTime: { gt: startTime },
                    endTime: { lt: endTime },
                },
                {
                    startTime: { equals: startTime },
                    endTime: { equals: endTime },
                },
            ],
        },
    });
    if (conflictingSchedules.length > 0) {
        throw new ApiError_1.default(config_1.httpStatus.CONFLICT, 'Schedule conflicts with an existing schedule check existing schedule');
    }
    const shedule = yield prisma_1.default.schedule.create({
        data: req.body,
    });
    if (!shedule) {
        throw new ApiError_1.default(config_1.httpStatus.INTERNAL_SERVER_ERROR, "Coudn't create shedule internel server error");
    }
    return shedule;
});
const getShedules = () => __awaiter(void 0, void 0, void 0, function* () {
    const schedules = yield prisma_1.default.schedule.findMany();
    if (!schedules) {
        throw new ApiError_1.default(config_1.httpStatus.NOT_FOUND, 'Shedules not found');
    }
    return schedules;
});
const getTrainerSchedules = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                email: user === null || user === void 0 ? void 0 : user.email,
                role: user === null || user === void 0 ? void 0 : user.role,
            },
        });
    }
    catch (error) {
        throw new ApiError_1.default(config_1.httpStatus.NOT_FOUND, 'Trainer not found please login again');
    }
    const trainerData = yield prisma_1.default.trainer.findUnique({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
    });
    console.log(trainerData);
    const schedules = yield prisma_1.default.schedule.findMany({
        where: {
            trainerId: trainerData === null || trainerData === void 0 ? void 0 : trainerData.id,
        },
    });
    return schedules;
});
exports.sheduleServices = {
    createShedule,
    getShedules,
    getTrainerSchedules,
};
