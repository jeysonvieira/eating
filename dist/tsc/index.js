"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = __importDefault(require("../routers/UserRouter"));
const DailyRouter_1 = __importDefault(require("../routers/DailyRouter"));
const express_handlebars_1 = require("express-handlebars");
const app = (0, express_1.default)();
//Midllewares
app.engine('.hbs', (0, express_handlebars_1.engine)({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
//Routers
app.use('/users', UserRouter_1.default);
app.use('/aliments', DailyRouter_1.default);
app.listen(3333, () => {
    console.log("Servidor on.");
});
