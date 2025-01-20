"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shedule_controller_1 = require("./shedule.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const validateReques_1 = __importDefault(require("../../middleware/validateReques"));
const shedule_validation_1 = require("./shedule.validation");
const router = express_1.default.Router();
// Route to get all trainers
router.post('/', (0, auth_1.default)(client_1.Role.ADMIN), (0, validateReques_1.default)(shedule_validation_1.sheduleValidations.createShedulValidation), shedule_controller_1.sheduleController.createShedule);
router.get('/', shedule_controller_1.sheduleController.getShedules);
// Route to get a specific shedule by ID
// router.get('/:id', sheduleController.getShedules);
router.get('/get-trainer-schedules', (0, auth_1.default)(client_1.Role.TRAINER), shedule_controller_1.sheduleController.getTrainerSchedules);
exports.sheduleRoutes = router;
