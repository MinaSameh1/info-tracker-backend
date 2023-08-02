import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { error } from 'firebase-functions/logger'
import { HttpStatus } from '../assets/httpCodes'

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.log.debug('validateResource')
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (e) {
      if (e instanceof ZodError) {
        error('Error in validation middleware: ', e.errors)
        res.locals.error = e.errors
        return res.status(HttpStatus.BAD_REQUEST).send(e.errors)
      }
      return next(e)
    }
  }

export default validateResource
