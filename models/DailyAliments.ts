import { Schema } from "mongoose";
import mongoose from "../db/conn";



interface alimentos {
    name : string,
    carb : number,
    prot : number,
    fat : number
}


const DialyTable = {

    name : {
        type : String,
        require : true
    },
    aliments : {
        type : Array ,
        require : true,
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
    owner : {
        type : String,
        require : true
    }

}


const DailyAliment = mongoose.model('DailyAliments', new Schema(DialyTable, {timestamps : true}))


export default DailyAliment ;