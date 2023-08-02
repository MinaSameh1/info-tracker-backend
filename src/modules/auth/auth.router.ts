import { Router } from 'express'
import { wrapExpressFunction } from '../../helpers/express.helper'
import { checkOtpToken, validateResource } from '../../middleware'
import { LoginInput } from '../../schemas/Auth.schema'
import { authController } from './auth.controller'

const AuthRouter = Router()

AuthRouter.get(
  '/login',
  checkOtpToken,
  validateResource(LoginInput),
  wrapExpressFunction(authController.login)
)

export default AuthRouter
