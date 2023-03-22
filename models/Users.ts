import { Schema } from "mongoose";
import mongoose from "../db/conn";



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
}

const User = mongoose.model('Users', new Schema(usertype, { timestamps: true }))


export default User