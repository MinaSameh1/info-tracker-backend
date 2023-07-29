import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../assets/httpCodes'
import { Roles } from '../models/roles.entity'

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

export function roleGuard(role: keyof typeof Roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const { roles } = user

    // Allow super admin to do anything.
    if (roles.includes(Roles.superAdmin) || roles.includes(role)) return next()

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "You don't have authorization to do this action." })
  }
}
