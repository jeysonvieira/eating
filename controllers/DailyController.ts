import DailyAliment from "../models/DailyAliments";
import WeekAliment from "../models/WeekAliments";
import { Request, Response } from "express";
import UserByToken from "../helpers/take-user-by-token";
import fs from 'fs'
import axios from 'axios'
import User from "../models/Users";



const AlimentsController = class {

    static async addAliment(req: Request, res: Response) {

        var type = req.body.type // O tipo da refeição (Café da manhã, almoço ou janta).
        var data: [] = req.body.data // Array com o nome dos alimentos.


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


        const fileJson: object = JSON.parse(file) // Objeto com todos dados do JSON.


        var Alimentos: [] = []
        var CalcAlimentos: number[] = [] // carbo -> proteina -> gordura


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

            if (data.length - 1 == i) {
                CalcAlimentos.push(sum1, sum2, sum3)
            }
        }


        const user = await UserByToken(req)

        const owner = user?.id

        const refeição = await new DailyAliment({ name: type, aliments: [data, CalcAlimentos], owner }).save()


        res.status(201).json({
            msg: "Refeição adicionada com sucesso.",
            refeição
        })

    }



    static async ClearDaily(req: Request, res: Response) {

        const APIlink = "http://worldtimeapi.org/api/timezone/America/Fortaleza"

        var day_week = await axios({
            method: 'get',
            url: APIlink,
            responseType: 'json'
        }).then(function (response) {

            const day_num = response.data.day_of_week

            const array_week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

            return array_week[day_num]

        });

        const userT = await UserByToken(req)

        if (userT?.id) {

            const DialyRefs = await DailyAliment.find({ owner: userT.id }).select("-_id -owner -createdAt -updatedAt -__v")

            const Ref = await new WeekAliment({ day: day_week, meal: DialyRefs, owner: userT.id }).save()

            await DailyAliment.deleteMany({ owner: userT.id })

            res.status(201).json({
                msg: "Tabela diária limpa, se alimente bem!"
            })
        } else {
            console.log("Error ao procurar seu ID.")
            return
        }

    }

    static async ReturnWeek(req: Request, res: Response) {

        interface IUser {
            name: string,
            id: string,
            iat: number
        }


        const id: IUser = req.user

        const Weektable = await WeekAliment.find({ owner: id.id }).select('-_id day meal')

        res.status(200).json({
            msg: "Aqui está a tabela da semana!",
            tabela: Weektable[0]

        })

    }

    static async WriteJSON(req: Request, res: Response) {

        interface IMacro {
            carbo: number,
            prot: number,
            fat: number
        }

        var name: string = req.body.name
        name = name.toLowerCase()

        const macros: IMacro = req.body.macros

        const Arquivo = fs.readFileSync('fruit.json', 'utf-8') // Lendo o arquivo JSON

        const JSONObj = JSON.parse(Arquivo)

        const id = Object.keys(JSONObj).length + 1

        const Alimento = {
            [name]: {
                id: id,
                carbo: macros.carbo,
                prot: macros.prot,
                fat: macros.fat
            }
        }

        // CONVERTENDO TUDO PARA STRING E MANIPULANDO NO FORMATO DE UM JSON.

        const AlimentoString = JSON.stringify(Alimento)

        const Length = Arquivo.length - 1

        const Copyjson = Arquivo.slice(0, Length) // -> Cópiando todo o arquivo já escrito, com excessão do ultimo fecha chaves.


        // Concatenação do arquivo já escrito com os novos dados que serão adicionados no JSON.

        const TT = Copyjson + "," + `"${name}" : {
        "id" : ${Alimento[name]["id"]},
        "carbo" : ${Alimento[name]["carbo"]},
        "prot" : ${Alimento[name]["prot"]},
        "fat" : ${Alimento[name]["fat"]} 
        }
        }`

        const ArquivoJSON = JSON.stringify(TT)

        // Delete e Create do novo arquivo JSON.

        await fs.unlink("fruit.json", (err) => {
            console.log(err)
        })

        await fs.writeFileSync("fruit.json", TT)

        res.status(201).json({
            msg : "Objeto adicionado com sucesso.",
            obj : Alimento
        })

    }


    static async Index(req: Request, res: Response) {

        res.render('/index')

    }

}


export default AlimentsController