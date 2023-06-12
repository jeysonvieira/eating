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
const DailyAliments_1 = __importDefault(require("../models/DailyAliments"));
const WeekAliments_1 = __importDefault(require("../models/WeekAliments"));
const take_user_by_token_1 = __importDefault(require("../helpers/take-user-by-token"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const AlimentsController = class {
    static addAliment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var type = req.body.type; // O tipo da refeição (Café da manhã, almoço ou janta).
            var data = req.body.data; // Array com o nome dos alimentos.
            if (!type) {
                res.status(422).json({
                    msg: "O tipo da refeição é obrigatório."
                });
                return;
            }
            if (!data) {
                res.status(500).json({
                    msg: "Houve um problema no sistema, tente novamente."
                });
                return;
            }
            const file = fs_1.default.readFileSync('fruit.json', 'utf-8');
            const fileJson = JSON.parse(file); // Objeto com todos dados do JSON.
            var Alimentos = [];
            var CalcAlimentos = []; // carbo -> proteina -> gordura
            data.forEach((ref) => {
                Alimentos.push(fileJson[ref]);
            });
            let sum1 = 0;
            let sum2 = 0;
            let sum3 = 0;
            for (let i = 0; i < data.length; i++) {
                sum1 += Alimentos[i]['carbo'];
                sum2 += Alimentos[i]['prot'];
                sum3 += Alimentos[i]['fat'];
                if (data.length - 1 == i) {
                    CalcAlimentos.push(sum1, sum2, sum3);
                }
            }
            const user = yield (0, take_user_by_token_1.default)(req);
            const owner = user === null || user === void 0 ? void 0 : user.id;
            const refeição = yield new DailyAliments_1.default({ name: type, aliments: [data, CalcAlimentos], owner }).save();
            res.status(201).json({
                msg: "Refeição adicionada com sucesso.",
                refeição
            });
        });
    }
    static ClearDaily(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const APIlink = "http://worldtimeapi.org/api/timezone/America/Fortaleza";
            var day_week = yield (0, axios_1.default)({
                method: 'get',
                url: APIlink,
                responseType: 'json'
            }).then(function (response) {
                const day_num = response.data.day_of_week;
                const array_week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
                return array_week[day_num];
            });
            const userT = yield (0, take_user_by_token_1.default)(req);
            if (userT === null || userT === void 0 ? void 0 : userT.id) {
                const DialyRefs = yield DailyAliments_1.default.find({ owner: userT.id }).select("-_id -owner -createdAt -updatedAt -__v");
                const Ref = yield new WeekAliments_1.default({ day: day_week, meal: DialyRefs, owner: userT.id }).save();
                yield DailyAliments_1.default.deleteMany({ owner: userT.id });
                res.status(201).json({
                    msg: "Tabela diária limpa, se alimente bem!"
                });
            }
            else {
                console.log("Error ao procurar seu ID.");
                return;
            }
        });
    }
    static ReturnWeek(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.user;
            const Weektable = yield WeekAliments_1.default.find({ owner: id.id }).select('-_id day meal');
            res.status(200).json({
                msg: "Aqui está a tabela da semana!",
                tabela: Weektable[0]
            });
        });
    }
    static WriteJSON(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var name = req.body.name;
            name = name.toLowerCase();
            const macros = req.body.macros;
            const Arquivo = fs_1.default.readFileSync('fruit.json', 'utf-8'); // Lendo o arquivo JSON
            const JSONObj = JSON.parse(Arquivo);
            const id = Object.keys(JSONObj).length + 1;
            const Alimento = {
                [name]: {
                    id: id,
                    carbo: macros.carbo,
                    prot: macros.prot,
                    fat: macros.fat
                }
            };
            // CONVERTENDO TUDO PARA STRING E MANIPULANDO NO FORMATO DE UM JSON.
            const AlimentoString = JSON.stringify(Alimento);
            const Length = Arquivo.length - 1;
            const Copyjson = Arquivo.slice(0, Length); // -> Cópiando todo o arquivo já escrito, com excessão do ultimo fecha chaves.
            // Concatenação do arquivo já escrito com os novos dados que serão adicionados no JSON.
            const TT = Copyjson + "," + `"${name}" : {
        "id" : ${Alimento[name]["id"]},
        "carbo" : ${Alimento[name]["carbo"]},
        "prot" : ${Alimento[name]["prot"]},
        "fat" : ${Alimento[name]["fat"]} 
        }
        }`;
            const ArquivoJSON = JSON.stringify(TT);
            // Delete e Create do novo arquivo JSON.
            yield fs_1.default.unlink("fruit.json", (err) => {
                console.log(err);
            });
            yield fs_1.default.writeFileSync("fruit.json", TT);
            res.status(201).json({
                msg: "Objeto adicionado com sucesso.",
                obj: Alimento
            });
        });
    }
    static Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('/index');
        });
    }
};
exports.default = AlimentsController;
