"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateReques_1 = __importDefault(require("../../middleware/validateReques"));
const trainee_validation_1 = require("../trainee/trainee.validation");
const user_controller_1 = require("./user.controller");
const trainer_validation_1 = require("../trainer/trainer.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-trainee', (0, validateReques_1.default)(trainee_validation_1.TraineeValidation.traineeValidationSchema), user_controller_1.userController.createTrainee);
router.post('/create-trainer', (0, auth_1.default)(client_1.Role.ADMIN), (0, validateReques_1.default)(trainer_validation_1.trainerValidations.createTrainerValidationSchema), user_controller_1.userController.createTrainer);
exports.userRoutes = router;
