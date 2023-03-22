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
const get_token_1 = __importDefault(require("./get-token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checktoken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.status(401).json({
            msg: "você não está logado no sistema."
        });
        return;
    }
    const token = (0, get_token_1.default)(req);
    if (typeof (token) == "boolean") {
        res.status(400).json({
            message: "Acesso negado!"
        });
        return;
    }
    if (typeof (token) == "string") {
        try {
            const verified = jsonwebtoken_1.default.verify(token, "nossosecret");
            console.log(typeof (verified));
            if (typeof (verified) == "object") {
                req.user = verified;
                console.log(req.user);
                next();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.default = checktoken;
