import jwt from 'jsonwebtoken'
import { Request } from 'express'
import checktoken from './check-token'
import GetToken from './get-token'
import User from '../models/Users'


const UserByToken = async (req : Request) => {

    var token = GetToken(req)

    if(typeof(token) == "string"){

        const dados = jwt.verify(token, "nossosecret")

        console.log(typeof(dados))

        if(typeof(dados) != "string"){
            const id = dados.id

            console.log(dados)
        

            const user = await User.findOne({_id : id})

            return user

        }

    }
    
}

export default UserByToken