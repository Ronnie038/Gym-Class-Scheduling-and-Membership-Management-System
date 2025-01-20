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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const adminData = {
    password: 'password',
    admin: {
        name: 'Admin User',
        email: 'admin@admin.com',
    },
};
function seedAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if admin user already exists
            const existingAdmin = yield prisma.admin.findUnique({
                where: {
                    email: adminData.admin.email,
                },
            });
            if (existingAdmin) {
                console.log('Admin already exists.');
                // clearDatabase();
                return;
            }
            const hashedPassword = yield bcrypt.hash(adminData.password, 12);
            const userData = {
                email: adminData.admin.email,
                password: hashedPassword,
                role: client_1.Role.ADMIN,
            };
            // Create an admin user
            const result = yield prisma.$transaction((transactionClient) => __awaiter(this, void 0, void 0, function* () {
                yield transactionClient.user.create({
                    data: userData,
                });
                const createdAdminData = yield transactionClient.admin.create({
                    data: adminData.admin,
                });
                return createdAdminData;
            }));
        }
        catch (error) {
            console.error('Error seeding admin:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete all data in Booking
        yield prisma.booking.deleteMany({});
        // Delete all data in Schedule
        yield prisma.schedule.deleteMany({});
        // Delete all data in Trainee
        yield prisma.trainee.deleteMany({});
        // Delete all data in Trainer
        yield prisma.trainer.deleteMany({});
        // If you have additional models, include them here
        console.log('All data deleted successfully!');
    }
    catch (error) {
        console.error('Error deleting data:', error);
    }
});
exports.default = seedAdmin;
