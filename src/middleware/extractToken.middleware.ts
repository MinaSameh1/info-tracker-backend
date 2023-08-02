import type { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../assets/httpCodes'
import { verifyJwt } from '../services/jwt.service'

export const extractToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res
      .setHeader('WWW-Authenticate', 'Basic')
      .sendStatus(HttpStatus.UNAUTHORIZED)
  }

  const token = authorization.replace(/Bearer /g, '')

  if (!token) {
    return res
      .setHeader('WWW-Authenticate', 'Basic')
      .sendStatus(HttpStatus.UNAUTHORIZED)
  }

  const user = verifyJwt(token)

  if (!user) {
    return res
      .setHeader('WWW-Authenticate', 'Basic')
      .sendStatus(HttpStatus.UNAUTHORIZED)
  }

  req.user = user

  req.log.info({ user }, 'User authenticated')
  next()
}
