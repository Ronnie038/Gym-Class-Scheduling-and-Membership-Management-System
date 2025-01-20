"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatus = void 0;
require("dotenv/config");
const http_status_1 = __importDefault(require("http-status"));
exports.httpStatus = http_status_1.default;
exports.default = {
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    jwt_access_secret: process.env.JWT_SECRET,
    jwt_access_expires_in: process.env.JWT_EXPIRES_IN,
};
