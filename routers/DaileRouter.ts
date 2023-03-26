import AlimentsController from "../controllers/DailyController";
import express from "express";
import checktoken from "../helpers/check-token";

const AlimentsRouter = express.Router()


AlimentsRouter.post('/add', checktoken, AlimentsController.addAliment)




export default AlimentsRouter