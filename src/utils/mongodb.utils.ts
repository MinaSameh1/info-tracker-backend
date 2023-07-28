import { Types } from 'mongoose'

export const ObjectId = (item: string | number) => new Types.ObjectId(item)

export const isObjectId = (item: string | number) =>
  Types.ObjectId.isValid(item)
