import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { JWT_SECRET } from '../config'
import { TokenPayload } from '../types/express'

export const JwtSign = (
  data: { _id: string | Types.ObjectId; role: string },
  expiresIn: '1d' | '10d' | '1y' = '1y'
) =>
  jwt.sign({ userId: data._id, role: data.role }, JWT_SECRET, {
    expiresIn: expiresIn
  })

/*
 * Takes JWT and verifys
 * @param {string} token
 */
export function verifyJwt(token: string) {
  try {
    const value = jwt.verify(token, JWT_SECRET)
    return {
      err: null,
      value: value as TokenPayload
    }
  } catch (err: unknown) {
    return {
      err: err,
      value: null
    }
  }
}
