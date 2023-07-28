import type { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger.js'

export function wrapExpressFunction(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    fn(req, res, next)
      .catch(next)
      .finally(() => {
        logger.info(
          `Request ${req.method} ${req.originalUrl} took: ${
            Date.now() - start
          }ms`
        )
      })
  }
}
