"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conn_1 = __importDefault(require("../db/conn"));
const usertype = {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    objective: {
        type: String,
        require: true
    }
};
const User = conn_1.default.model('Users', new mongoose_1.Schema(usertype, { timestamps: true }));
exports.default = User;
