import type { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpStatus } from '../assets/httpCodes'
import { IAppPermissionsValues } from '../models/permissions.entity'

/**
 * @description Check if the user has the permission to access the route
 * The user must be authenticated before this middleware is called
 * its meant to be used multiple times in the same route if needed
 * @param {IAppPermissionsValues} permission - The permission to check
 * @returns {RequestHandler} - The middleware function
 */
export const checkUserPermissions = (
  permission: IAppPermissionsValues
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user.permissions.includes(permission)) {
      return next()
    }

    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden' })
  }
}
