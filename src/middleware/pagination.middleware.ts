import { Request, Response, NextFunction } from 'express'

export function pagination(req: Request, _res: Response, next: NextFunction) {
  const page = req.query.page ? parseInt(req.query.page.toString()) - 1 : 0
  req.limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10
  req.skip = page * req.limit
  next()
}
