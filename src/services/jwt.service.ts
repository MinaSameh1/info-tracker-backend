import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '../config'
import { TokenPayload } from '../types/token.payload'

export function signJwt(
  object: TokenPayload,
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(JWT_PRIVATE_KEY).toString('ascii')

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export function verifyJwt(token: string): TokenPayload | null {
  const publicKey = Buffer.from(JWT_PRIVATE_KEY).toString('ascii')

  try {
    const decoded = jwt.verify(token, publicKey) as TokenPayload
    return decoded
  } catch (e) {
    return null
  }
}
