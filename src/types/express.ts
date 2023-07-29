import type { NextFunction, Request, Response } from 'express'
import { Roles } from '../models/roles.entity'

export type TokenPayload = {
  id: string
  permissions: string[]
  // values of Roles
  roles: (typeof Roles)[keyof typeof Roles][]
}

export type Pagination = {
  limit: number
  skip: number
}

export type ExpressFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown

declare module 'express-serve-static-core' {
  interface Request extends Pagination {
    user: TokenPayload
  }

  // interface Response {}
}
