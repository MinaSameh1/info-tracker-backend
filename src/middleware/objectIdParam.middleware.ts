import { NextFunction, Request, Response } from 'express'
import { ObjectId, isObjectId } from '../utils'

export const ObjectIdParam = (param: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params[param])
        return res.status(400).json({
          message: `Missing ${param} param`,
          error: true
        })

      if (!isObjectId(req.params[param]))
        return res
          .status(400)
          .json({ message: `Invalid ${param} param`, error: true })

      // transform to ObjectId
      req.params[param] = ObjectId(req.params[param]) as unknown as string

      next()
    } catch (err) {
      next(err)
    }
  }
}
