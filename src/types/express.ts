import type { NextFunction, Request, Response } from 'express'

export type TokenPayload = {
  id: string
  permissions: string[]
  roles: string[]
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
