import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

const app = express()

/********** GLOBAL MIDDLEWARES **********/
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.json({ greeting: 'Hello world!' })
})
