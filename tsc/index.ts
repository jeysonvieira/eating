import express from 'express'
import cors from 'cors'
import UserRouter from '../routers/UserRouter'
import AlimentsRouter from '../routers/DailyRouter'
import { engine } from 'express-handlebars'
import axios from 'axios'

const app = express()


//Midllewares
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


//Routers
app.use('/users', UserRouter)
app.use('/aliments', AlimentsRouter)

app.listen(3333, () => {
    console.log("Servidor on.")
})

