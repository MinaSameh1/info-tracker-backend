import { HttpStatus } from '../assets/httpCodes'
import { ExpressFunc } from '../types/express'

/**
 * @description Checks request Params and validates them according to functions.
 * @param {string[]} params Array of params that we want to check
 * @param {(item: string) => boolean} checks Array of functions that check the param type.
 * @return {void}
 */
export const verifyParams =
  (
    params: Array<string>,
    // eslint-disable-next-line no-unused-vars
    ...checks: Array<(item: string) => boolean>
  ): ExpressFunc =>
  (req, res, next) => {
    try {
      for (const param of params) {
        if (!req.params[param])
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `Missing ${param} param`,
            error: true
          })
        for (const check of checks) {
          if (!check(req.params[param]))
            return res
              .status(HttpStatus.BAD_REQUEST)
              .json({ message: `Invalid ${param} param`, error: true })
        }
      }
      next()
    } catch (err) {
      next(err)
    }
  }
