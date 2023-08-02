import type { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger.js'
import { HttpStatus } from '../assets/httpCodes.js'

export function wrapExpressFunction(
  // This done as the controller's Request are typed, so when passed here it complains about the type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (req: any, res: Response, next: NextFunction) => Promise<unknown>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    Promise.resolve(fn(req, res, next))
      .catch(next)
      .finally(() => {
        logger.info(
          `Wrapper ---- Request ${req.method} ${req.originalUrl} took: ${
            Date.now() - start
          }ms`
        )
      })
  }
}

export function UanuthorizedResponse(
  res: Response,
  logger?: (msg: string) => void,
  cause?: string
) {
  if (logger) logger(`Unauthorized ${cause}`)
  return res
    .setHeader('WWW-Authenticate', 'Basic')
    .sendStatus(HttpStatus.UNAUTHORIZED)
}
