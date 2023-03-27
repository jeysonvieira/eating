import { Schema } from "mongoose"
import mongoose from "../db/conn"

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


}


const WeekAliment = mongoose.model("Weekaliments", new Schema(WeekAliments, { timestamps: true }))


export default WeekAliment