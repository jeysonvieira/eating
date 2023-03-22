"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const check_token_1 = __importDefault(require("../helpers/check-token"));
const UserRouter = express_1.default.Router();
UserRouter.post('/signup', UserController_1.default.Signup);
UserRouter.post('/login', check_token_1.default, UserController_1.default.Login);
exports.default = UserRouter;
