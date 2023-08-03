import type { NextFunction, Request, Response } from 'express'
import { UanuthorizedResponse } from '../helpers/express.helper'
export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.log.debug('requireUser')
  if (!req.user) {
    return UanuthorizedResponse(res, 'User is not logged in')
  }
  return next()
}
