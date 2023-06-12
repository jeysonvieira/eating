"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conn_1 = __importDefault(require("../db/conn"));
const WeekAliments = {
    day: {
        type: String,
        require: true
    },
    meal: {
        type: Object,
        require: true
    },
    owner: {
        type: String,
        require: true
    }
};
const WeekAliment = conn_1.default.model("Weekaliments", new mongoose_1.Schema(WeekAliments, { timestamps: true }));
exports.default = WeekAliment;
