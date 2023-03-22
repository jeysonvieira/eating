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
const Users_1 = __importDefault(require("../models/Users"));
const create_token_1 = __importDefault(require("../helpers/create-token"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserController = class {
    static Signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { name, email, password, confpassword, age, height, weight, objective } = req.body;
            if (!name) {
                res.status(422).json({
                    msg: "O nome é obrigatório."
                });
                return;
            }
            if (!email) {
                res.status(422).json({
                    msg: "O email é obrigatório."
                });
                return;
            }
            if (!password) {
                res.status(422).json({
                    msg: "A senha é obrigatória."
                });
                return;
            }
            if (!confpassword) {
                res.status(422).json({
                    msg: "A confirmação de senha é obrigatória."
                });
                return;
            }
            if (!age) {
                res.status(422).json({
                    msg: "A idade é obrigatória."
                });
                return;
            }
            if (!height) {
                res.status(422).json({
                    msg: "A altura é obrigatória."
                });
                return;
            }
            if (!weight) {
                res.status(422).json({
                    msg: "O peso é obrigatório"
                });
                return;
            }
            if (!objective) {
                res.status(422).json({
                    msg: "O objetivo é obrigatório"
                });
                return;
            }
            if (password !== confpassword) {
                res.status(422).json({
                    msg: "A confirmação de senha precisa ser igual a senha."
                });
                return;
            }
            const checkuser = yield Users_1.default.findOne({ email: email });
            if (checkuser) {
                res.status(422).json({
                    msg: "Esse E-mail já possui cadastro no sistema, tente outro."
                });
                return;
            }
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(password, salt);
            password = hash;
            const user = yield new Users_1.default({ name, email, password, age, height, weight, objective }).save();
            //const values = user
            yield (0, create_token_1.default)(user.name, user._id, req, res);
        });
    }
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const checkemail = yield Users_1.default.findOne({ email: email }).lean();
            if (!checkemail) {
                res.status(422).json({
                    msg: "O E-mail não possui cadastro no sistema."
                });
                return;
            }
            const descript = bcryptjs_1.default.compareSync(password, checkemail.password);
            console.log(descript);
            console.log('oiii');
            if (!descript) {
                res.status(422).json({
                    msg: "Senha incorreta."
                });
                return;
            }
            yield (0, create_token_1.default)(checkemail.name, checkemail._id, req, res);
        });
    }
};
exports.default = UserController;
