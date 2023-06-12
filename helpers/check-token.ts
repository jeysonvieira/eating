import express from 'express'
import GetToken from './get-token'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'


const checktoken = async (req: Request, res: Response, next: NextFunction) => {



    if (!req.headers.authorization) {
        res.status(401).json({
            msg: "você não está logado no sistema."
        })

        return
    }


    const token: string | boolean = GetToken(req)


    if (typeof (token) == "boolean") {
        res.status(400).json({
            message: "Acesso negado!"
        })

        return

    }

    if (typeof (token) == "string") {

        try {
            interface IT{
                name : string,
                id : string,
                iat : number | undefined
            }

            const verified : string | JwtPayload | IT = jwt.verify(token, "nossosecret")

            if(typeof(verified) == "object"){

                const UserValues : IT = {
                    name : verified.name,
                    id : verified.id,
                    iat : verified.iat
                }
                
                req.user = UserValues

                next()
            }
        } catch (err) {

            console.log(err)

        }

    }



}


export default checktoken