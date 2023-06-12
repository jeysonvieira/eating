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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const get_token_1 = __importDefault(require("./get-token"));
const Users_1 = __importDefault(require("../models/Users"));
const UserByToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var token = (0, get_token_1.default)(req);
    if (typeof (token) == "string") {
        const dados = jsonwebtoken_1.default.verify(token, "nossosecret");
        if (typeof (dados) != "string") {
            const id = dados.id;
            const user = yield Users_1.default.findOne({ _id: id }).select("-password");
            return user;
        }
    }
});
exports.default = UserByToken;
