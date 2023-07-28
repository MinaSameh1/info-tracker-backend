import { z } from 'zod'
import { ObjectId } from '../utils'

export const ObjectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i)
  .transform(val => ObjectId(val))
