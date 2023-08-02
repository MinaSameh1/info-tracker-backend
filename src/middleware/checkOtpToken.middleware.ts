import type { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../assets/httpCodes'
import { OTP_TOKEN } from '../config'

export const checkOtpToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otpToken } = req.headers
  if (!otpToken) {
    return res
      .setHeader('WWW-Authenticate', 'Basic')
      .sendStatus(HttpStatus.UNAUTHORIZED)
  }

  if (otpToken !== OTP_TOKEN) {
    return res
      .setHeader('WWW-Authenticate', 'Basic')
      .sendStatus(HttpStatus.UNAUTHORIZED)
  }

  next()
}
