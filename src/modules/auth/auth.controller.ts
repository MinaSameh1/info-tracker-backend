import type { Request, Response } from 'express'
import { LoginInputType } from '../../schemas/Auth.schema'
import { authService } from './auth.service'
import { HttpStatus } from '../../assets/httpCodes'
import { compare } from '../../services/hashing.service'

export const authController = Object.freeze({
  login: async (
    req: Request<unknown, unknown, LoginInputType['body']>,
    res: Response
  ) => {
    const { username, password } = req.body
    const user = await authService.findUserByUserName(username)
    if (!user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Invalid credentials' })
    }

    if (!user.active) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Your account is not active, please contact an administrator'
      })
    }

    const token = await authService.generateToken(user)

    delete (user as { password?: string }).password
    return res.status(HttpStatus.OK).json({ user, token })
  }
})
