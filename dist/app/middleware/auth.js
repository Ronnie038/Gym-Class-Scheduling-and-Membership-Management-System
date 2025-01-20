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
// import { jwtHelpers } from "../../helpars/jwtHelpers";
const config_1 = __importDefault(require("../../config"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("../helpers/jwtHelper");
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../shared/prisma"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: 'Unauthorized access.',
                    errorDetails: 'need valid accessToken with authorization header',
                });
                return;
            }
            const verifiedUser = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt_access_secret);
            try {
                yield prisma_1.default.user.findUnique({
                    where: {
                        email: verifiedUser.email,
                        role: verifiedUser.role,
                    },
                });
            }
            catch (error) {
                res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: 'Unauthorized access',
                    errorDetails: 'Please Login again and use accessToken with authorization header',
                });
            }
            req.user = verifiedUser;
            if (roles.length && !roles.includes(verifiedUser.role)) {
                if (verifiedUser.role === client_1.Role.ADMIN) {
                    res.status(http_status_1.default.UNAUTHORIZED).json({
                        success: false,
                        message: 'Unauthorized access',
                        errorDetails: 'Admin do not have this permission to perform this action',
                    });
                }
                else if (verifiedUser.role === client_1.Role.TRAINER) {
                    res.status(http_status_1.default.UNAUTHORIZED).json({
                        success: false,
                        message: 'Unauthorized access',
                        errorDetails: 'Trainer do not have this permission to perform this action',
                    });
                }
                else {
                    res.status(http_status_1.default.UNAUTHORIZED).json({
                        success: false,
                        message: 'Unauthorized access',
                        errorDetails: `You must be an ${roles.join()} to perform this action.`,
                    });
                }
                return;
            }
            next();
        }
        catch (err) {
            console.log(err);
            res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized access',
                errorDetails: 'your access token is invalid or expired, please login again and get a new access token with authorization header',
            });
            return;
        }
    });
};
exports.default = auth;
