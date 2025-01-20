"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const trainer_controller_1 = require("./trainer.controller");
const router = express_1.default.Router();
// Route to get all trainers
router.get('/', trainer_controller_1.trainerController.getTrainers);
// Route to get a specific trainer by ID
router.get('/:id', trainer_controller_1.trainerController.getTrainersById);
exports.trainerRoutes = router;
