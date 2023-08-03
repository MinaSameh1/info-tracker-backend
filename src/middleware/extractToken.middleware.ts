import type { NextFunction, Request, Response } from 'express'
import { verifyJwt } from '../services/jwt.service'
import { UanuthorizedResponse } from '../helpers/express.helper'

export const extractToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return next()
  }

  req.log.debug('extractToken Authorization header found')

  const token = authorization.replace(/Bearer /g, '')

  if (!token) {
    return UanuthorizedResponse(res, 'Missing Token')
  }

  const user = verifyJwt(token)

  if (!user) {
    return UanuthorizedResponse(res, 'Invalid Token')
  }

  req.user = user

  req.log.info({ user }, 'User authenticated')
  next()
}
