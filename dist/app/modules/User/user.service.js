"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userServices = void 0;
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createTrainee = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { password, trainee } = req.body;
    const hashedPassword = yield bcrypt.hash(password, 12);
    const userData = {
        email: trainee.email,
        password: hashedPassword,
        role: client_1.Role.TRAINEE,
    };
    const axistingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (axistingUser) {
        throw new ApiError_1.default(409, 'User already exists with this email');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const traineeData = Object.assign(Object.assign({}, trainee), { dateOfBirth: new Date(trainee.dateOfBirth) });
        const createdTraineeData = yield transactionClient.trainee.create({
            data: traineeData,
        });
        return createdTraineeData;
    }));
    return result;
});
const createTrainer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { password, trainer } = req.body;
    const hashedPassword = yield bcrypt.hash(password, 12);
    const userData = {
        email: trainer.email,
        password: hashedPassword,
        role: client_1.Role.TRAINER,
    };
    const axistingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (axistingUser) {
        throw new ApiError_1.default(409, 'User already exists with this email');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const trainerData = Object.assign({}, trainer);
        const createdTraineeData = yield transactionClient.trainer.create({
            data: trainerData,
        });
        return createdTraineeData;
    }));
    return result;
});
exports.userServices = {
    createTrainee,
    createTrainer,
};
