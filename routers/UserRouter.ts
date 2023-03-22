import express from 'express'
import UserController from '../controllers/UserController'
import checktoken from '../helpers/check-token'


const UserRouter = express.Router()



UserRouter.post('/signup', UserController.Signup)
UserRouter.post('/login', UserController.Login)



export default UserRouter
