import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../assets/httpCodes'
import { Roles } from '../models/roles.entity'
import { ValueOf } from '../types/helper.types'

// export function roleGuard(req: Request, res: Response, next: NextFunction) {
//   const user = req.user
//   const { role } = user
//
//   if (role === Roles.superAdmin) return next()
//
//   const { method, path } = req
//   const permission = `${method}:${path}`
//
//   const hasPermission = UserPermissions.hasPermission(role, permission)
//
//   if (!hasPermission)
//     return res.status(HttpStatus.FORBIDDEN).json({
//       message: 'You do not have permission to perform this action'
//     })
//
//   next()
// }

// old type: (typeof Roles)[keyof typeof Roles]
export function roleGuard(role: ValueOf<typeof Roles>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'You must be logged in to do this action.' })
    }

    const { roles } = user

    // Allow super admin to do anything.
    if (roles.includes(Roles.SUPER_ADMIN) || roles.includes(role)) return next()

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "You don't have authorization to do this action." })
  }
}
