import express from 'express'
import UserController from '../controllers/UserController'
import checktoken from '../helpers/check-token'
import User from '../models/Users'


const UserRouter = express.Router()



UserRouter.post('/signup', UserController.Signup)
UserRouter.post('/login', UserController.Login)
UserRouter.get('/login', UserController.LoginGet)
UserRouter.get('/signup', UserController.SignUp)



export default UserRouter
