import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { HttpStatus } from './assets/httpCodes.js'
import { loggerMiddleware } from './config/logger.js'
import { initalize } from './config/config.js'
import PersonRouter from './modules/person/person.router.js'
import { pagination } from './middleware/pagination.middleware.js'

const app = express()

/********** GLOBAL MIDDLEWARES **********/
// Sane defaults middlewares
app.use(cors({ origin: true }))
app.use(helmet())
app.use(loggerMiddleware)
app.use(pagination)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/********** ROUTES *********/
// Load routes

app.use('/persons', PersonRouter)

/********** ERROR HANDLER *********/
app.use(
  (
    err: Error & {
      code: string
      type: string
    },
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ): void | Promise<void> => {
    res.err = err
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: 'Internal Server Error' })
  }
)

await initalize()

export default app
