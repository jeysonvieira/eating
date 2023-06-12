"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conn_1 = __importDefault(require("../db/conn"));
const DialyTable = {
    name: {
        type: String,
        require: true
    },
    aliments: {
        type: Array,
        require: true,
    },
    // carb : {
    //     type : Number,
    //     require : true
    // },
    // prot : {
    //     type : Number,
    //     require : true
    // },
    // fat : {
    //     type : Number,
    //     require : true
    // },
    owner: {
        type: String,
        require: true
    }
};
const DailyAliment = conn_1.default.model('DailyAliments', new mongoose_1.Schema(DialyTable, { timestamps: true }));
exports.default = DailyAliment;
