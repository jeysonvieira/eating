import jwt, { sign } from 'jsonwebtoken'
import { Request, Response, json } from 'express'
import mongoose from 'mongoose'

interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    height: number,
    weight: number,
    objective: string
}


const createToken = async (name: string | undefined, id: mongoose.Types.ObjectId, req: Request, res: Response) => {

    const token = jwt.sign({
        name: name,
        id: id
    }, "nossosecret")


    res.status(201).json({
        msg: "Login concluído com sucesso.",
        token: token,
        userId: id
    })


}


export default createToken




