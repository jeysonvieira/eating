import AlimentsController from "../controllers/DailyController";
import express from "express";
import checktoken from "../helpers/check-token";

const AlimentsRouter = express.Router()


AlimentsRouter.post('/add', checktoken, AlimentsController.addAliment)
AlimentsRouter.post('/write', checktoken, AlimentsController.WriteJSON)
AlimentsRouter.get('/clear', checktoken, AlimentsController.ClearDaily)
AlimentsRouter.get('/week', checktoken, AlimentsController.ReturnWeek)




export default AlimentsRouter