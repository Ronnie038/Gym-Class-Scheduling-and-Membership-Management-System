"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const zodValidationError_1 = __importDefault(require("../errors/zodValidationError"));
const zod_1 = require("zod");
const prismaClientValidationError_1 = __importDefault(require("../errors/prismaClientValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR || (err === null || err === void 0 ? void 0 : err.statusCode);
    let success = false;
    let message = err.message || 'Something went wrong!';
    let errorDetails = err;
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodValidationError_1.default)(err);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = (0, prismaClientValidationError_1.default)(err);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = 'Duplicate Key error';
            errorDetails = err.meta;
        }
    }
    res.status(statusCode).json({
        success,
        message,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
