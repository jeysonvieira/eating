import express from 'express'
import cors from 'cors'
import UserRouter from '../routers/UserRouter'
import AlimentsRouter from '../routers/DaileRouter'

const app = express()


//Midllewares
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


//Routers
app.use('/users', UserRouter)
app.use('/aliments', AlimentsRouter)

app.listen(3333, () => {
    console.log("Servidor on.")
})

