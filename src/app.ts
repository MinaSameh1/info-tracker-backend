import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { HttpStatus } from './assets/httpCodes.js'
import { initalize } from './config/config.js'
import { loggerMiddleware } from './config/logger.js'
import { pagination } from './middleware/pagination.middleware.js'
import AuthRouter from './modules/auth/auth.router.js'
import PersonRouter from './modules/person/person.router.js'
import UserRouter from './modules/user/user.router.js'
import { extractToken } from './middleware/extractToken.middleware.js'

// Make sure env vars are valid and set up db connection before anything else
await initalize()

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
// Global routes
app.use('/auth', AuthRouter)

// Protected routes
app.use(extractToken)
app.use('/persons', PersonRouter)
app.use('/users', UserRouter)

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

export default app
