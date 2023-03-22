import express from 'express'
import { Request, Response, NextFunction } from 'express'



const GetToken = (req : Request) : string | boolean => {

    var AuthHeader = req.headers.authorization

    if(AuthHeader){
        const token = AuthHeader.split(" ")[1]

        return token
    } else{

        return false

    }

    

}



export default GetToken