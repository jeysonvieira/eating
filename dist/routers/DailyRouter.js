"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DailyController_1 = __importDefault(require("../controllers/DailyController"));
const express_1 = __importDefault(require("express"));
const check_token_1 = __importDefault(require("../helpers/check-token"));
const AlimentsRouter = express_1.default.Router();
AlimentsRouter.post('/add', check_token_1.default, DailyController_1.default.addAliment);
AlimentsRouter.post('/write', check_token_1.default, DailyController_1.default.WriteJSON);
AlimentsRouter.get('/clear', check_token_1.default, DailyController_1.default.ClearDaily);
AlimentsRouter.get('/week', check_token_1.default, DailyController_1.default.ReturnWeek);
exports.default = AlimentsRouter;
