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
exports.bookingServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const config_1 = require("../../../config");
const formateDate_1 = require("../../utils/formateDate");
const createBooking = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    const trainee = yield prisma_1.default.trainee.findUnique({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
    });
    // Check if the booking already exists
    if (!trainee) {
        throw new ApiError_1.default(config_1.httpStatus.UNAUTHORIZED, 'trainee could not be found');
    }
    const existingBooking = yield prisma_1.default.booking.findFirst({
        where: {
            traineeId: trainee.id,
            scheduleId: data.scheduleId,
        },
    });
    if (existingBooking) {
        throw new ApiError_1.default(config_1.httpStatus.BAD_REQUEST, 'Booking already exists for this schedule and trainee.');
    }
    // Check if the schedule has reached the booking limit
    const bookingCount = yield prisma_1.default.booking.count({
        where: {
            scheduleId: data.scheduleId,
        },
    });
    if (bookingCount >= 10) {
        throw new ApiError_1.default(config_1.httpStatus.BAD_REQUEST, 'This schedule has reached the maximum booking limit of 10.');
    }
    // Create the booking
    const booking = yield prisma_1.default.booking.create({
        data: {
            traineeId: trainee.id,
            scheduleId: data.scheduleId,
            bookingDate: (0, formateDate_1.formatDateToYYYYMMDD)(),
        },
    });
    return booking;
});
const getBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { traineeId, scheduleId } = query;
    const filters = {};
    if (traineeId)
        filters.traineeId = traineeId;
    if (scheduleId)
        filters.scheduleId = scheduleId;
    const bookings = yield prisma_1.default.booking.findMany({
        where: filters,
        include: {
            trainee: true,
            schedule: true,
        },
    });
    return bookings;
});
const getTraineeBookings = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const trainee = yield prisma_1.default.trainee.findUnique({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
    });
    if (!trainee) {
        throw new ApiError_1.default(config_1.httpStatus.UNAUTHORIZED, 'trainee could not be found');
    }
    const bookings = yield getBookings({ traineeId: trainee.id });
    if (!bookings) {
        throw new ApiError_1.default(config_1.httpStatus.NOT_FOUND, 'Bookings not found');
    }
    return bookings;
});
const cancelBooking = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookingId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const booking = yield prisma_1.default.booking.findUniqueOrThrow({
        where: { id: bookingId },
    });
    try {
        yield prisma_1.default.booking.findUniqueOrThrow({
            where: { id: bookingId },
        });
    }
    catch (error) {
        throw new ApiError_1.default(config_1.httpStatus.NOT_FOUND, 'Booking not found');
    }
    yield prisma_1.default.booking.delete({ where: { id: bookingId } });
    return booking;
});
exports.bookingServices = {
    createBooking,
    getBookings,
    getTraineeBookings,
    cancelBooking,
};
