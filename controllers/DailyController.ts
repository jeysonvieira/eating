import DilyAliment from "../models/DialyAliments";
import { Request, Response } from "express";
import UserByToken from "../helpers/take-user-by-token";
import fs from 'fs'



const AlimentsController = class {

    static async addAliment(req: Request, res: Response) {

        var type = req.body.type // O tipo da refeição (Café da manhã, almoço ou janta).
        var data : [] = req.body.data // Array com o nome dos alimentos.


        if (!type) {
            res.status(422).json({
                msg: "O tipo da refeição é obrigatório."
            })

            return
        }

        if (!data) {
            res.status(500).json({
                msg: "Houve um problema no sistema, tente novamente."
            })

            return
        }


        const file = fs.readFileSync('fruit.json', 'utf-8')


        const fileJson : object = JSON.parse(file)


        var Alimentos : [] = []
        var CalcAlimentos : number[] = [] // carbo -> proteina -> gordura


        data.forEach((ref) => {
            Alimentos.push(fileJson[ref])
        })

        let sum1 = 0
        let sum2 = 0
        let sum3 = 0


        for (let i = 0; i < data.length; i++) {

            sum1 += Alimentos[i]['carbo']
            sum2 += Alimentos[i]['prot']
            sum3 += Alimentos[i]['fat']

            if(data.length - 1 == i){
                CalcAlimentos.push(sum1, sum2, sum3)
            }
        }


        const user = await UserByToken(req)

        const owner = user?.id
        
        const refeição = await new DilyAliment({name : type, aliments : [data, CalcAlimentos], owner}).save()

        
        res.status(201).json({
            msg : "Refeição adicionada com sucesso.",
            refeição
        })

    }

}


export default AlimentsController