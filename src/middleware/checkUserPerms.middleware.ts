import type { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../assets/httpCodes'

export const checkUserPermissions = (...permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized' })
    }

    for (const perm of permissions) {
      if (user.permissions.includes(perm)) {
        return next()
      }
    }

    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden' })
  }
}
