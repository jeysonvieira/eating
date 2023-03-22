import User from "../models/Users";
import mongoose from "mongoose";
import { Response, Request } from "express";
import createToken from "../helpers/create-token";
import bcrypt from 'bcryptjs'


interface IdadosSignup {
    name: string,
    email: string,
    password: string,
    confpassword: string,
    age: number,
    height: number,
    weight: number,
    objective: string //"ganho" | "perda"
}

interface IdadosLogin {
    email: string,
    password: string
}


const UserController = class {

    static async Signup(req: Request, res: Response) {


        var { name, email, password, confpassword, age, height, weight, objective }: IdadosSignup = req.body


        if (!name) {

            res.status(422).json({
                msg: "O nome é obrigatório."
            })

            return
        }

        if (!email) {

            res.status(422).json({
                msg: "O email é obrigatório."
            })

            return
        }

        if (!password) {

            res.status(422).json({
                msg: "A senha é obrigatória."
            })

            return
        }

        if (!confpassword) {

            res.status(422).json({
                msg: "A confirmação de senha é obrigatória."
            })

            return
        }

        if (!age) {

            res.status(422).json({
                msg: "A idade é obrigatória."
            })

            return
        }

        if (!height) {

            res.status(422).json({
                msg: "A altura é obrigatória."
            })

            return
        }

        if (!weight) {

            res.status(422).json({
                msg: "O peso é obrigatório"
            })

            return
        }

        if (!objective) {

            res.status(422).json({
                msg: "O objetivo é obrigatório"
            })

            return
        }

        if (password !== confpassword) {

            res.status(422).json({
                msg: "A confirmação de senha precisa ser igual a senha."
            })

            return
        }


        const checkuser = await User.findOne({ email: email })


        if (checkuser) {

            res.status(422).json({
                msg: "Esse E-mail já possui cadastro no sistema, tente outro."
            })

            return
        }


        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(password, salt)

        password = hash


        const user = await new User({ name, email, password, age, height, weight, objective }).save()


        //const values = user

        await createToken(user.name, user._id, req, res)


    }


    static async Login(req: Request, res: Response) {

        const { email, password }: IdadosLogin = req.body


        const checkemail: { password: string, name: string, _id: mongoose.Types.ObjectId } = await User.findOne({ email: email }).lean()

        if (!checkemail) {
            res.status(422).json({
                msg: "O E-mail não possui cadastro no sistema."
            })

            return
        }


        const descript = bcrypt.compareSync(password, checkemail.password)


        if (!descript) {
            res.status(422).json({
                msg: "Senha incorreta."
            })

            return
        }



        await createToken(checkemail.name, checkemail._id, req, res)


    }



}


export default UserController