import type { NextFunction, Request, Response } from 'express'
import { OTP_TOKEN } from '../config'
import { UanuthorizedResponse } from '../helpers/express.helper'

export const checkOtpToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.log.debug('checkOtpToken')
  const otpToken = req.get('otptoken')
  if (!otpToken) {
    return UanuthorizedResponse(res, req.log.debug, 'Missing Otp token')
  }

  if (otpToken !== OTP_TOKEN) {
    return UanuthorizedResponse(res, req.log.debug, 'Wrong Otp token')
  }

  next()
}
