import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { LoggerRepository } from './repositories/Logger.repository'
import { HttpStatus } from './assets'
import { initalize, loggerMiddleware } from './config'
import { extractToken, pagination, requireUser } from './middleware'
import AuthRouter from './modules/auth/auth.router'
import PersonRouter from './modules/person/person.router'
import UserRouter from './modules/user/user.router'

// Make sure env vars are valid and set up db connection before anything else

initalize()

const app = express()

/********** GLOBAL MIDDLEWARES **********/
// Sane defaults middlewares
app.use(cors({ origin: true }))
app.use(helmet())
app.use(loggerMiddleware)
app.use(pagination)
app.use(extractToken)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/********** ROUTES *********/
// Global routes
app.use('/auth', AuthRouter)

// Protected routes
app.use('/persons', requireUser, PersonRouter)
app.use('/users', requireUser, UserRouter)

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
    const ip =
      req.headers['fastly-client-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.ip

    // Sometimes erorr caused the user to be undefined, but now it's not -\__('-')__/-
    // extractToken(req, res, _next)

    LoggerRepository.Create({
      user: req.user?._id,
      action: req.method as string,
      resource: req.originalUrl,
      type: 'error',
      payload: {
        status: res.statusCode,
        error: err.message,
        cause: err.cause,
        code: err.code,
        stack: err.stack
      },
      ip: ip as string,
      userAgent: req.get('user-agent') ?? 'unknown',
      contentLength: Number(res.get('content-length') ?? 0)
    })
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: 'Internal Server Error' })
  }
)

export default app
