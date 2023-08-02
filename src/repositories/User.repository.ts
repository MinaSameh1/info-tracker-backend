import { ProjectionType, QueryOptions, Types } from 'mongoose'
import { normalizeArabicSpaces } from '../utils'
import { UserDocument, UserModel } from '../models/user.model'
import { UserInput } from '../schemas/User.schema'

export const UserRepository = Object.freeze({
  create: (user: UserInput): Promise<UserDocument> => UserModel.create(user),

  findOneByUserName: (username: string) =>
    UserModel.findOne({ username }).lean().exec(),

  findOneById: (
    id: string | Types.ObjectId,
    {
      select,
      options
    }: {
      select?: ProjectionType<UserDocument>
      options?: QueryOptions<UserDocument>
    } = {
      select: { __v: 0, password: 0 },
      options: { lean: true }
    }
  ) => UserModel.findById(id, select, options).exec(),

  findOneByNationalId: (nationalId: string, lean = true) =>
    UserModel.findOne({ nationalId }, { lean }).exec(),

  findByCreatedBy: (createdBy: Types.ObjectId, lean = true) =>
    UserModel.find({ createdBy }, { lean }).exec(),

  countDocuments: (filter: Record<string, unknown>) =>
    UserModel.countDocuments(filter).exec(),

  deleteOne: (filter: Record<string, unknown>) =>
    UserModel.deleteOne(filter).lean().exec(),

  findOneAndUpdate: (
    filter: Record<string, unknown>,
    update: Record<string, unknown>,
    {
      options = { new: true }
    }: {
      options: QueryOptions<UserDocument>
    }
  ) => UserModel.findOneAndUpdate(filter, update, options).exec(),

  findManyAndPaginate: ({
    filter,
    limit,
    skip,
    options = { lean: true },
    select
  }: {
    filter: Record<string, unknown>
    limit: number
    skip: number
    options?: QueryOptions<UserDocument>
    select?: ProjectionType<UserDocument>
  }) =>
    UserModel.find(filter, select, options)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec(),

  filterQuery: (query: Record<string, unknown>) => {
    const filter: Record<string, unknown> = {}

    if (query.name) {
      filter.name = {
        $regex: normalizeArabicSpaces(query.name.toString()),
        $options: 'i'
      }
    }

    if (query.role) {
      filter.role = { $eq: query.role }
    }

    if (query.status) {
      filter.status = { $eq: query.status }
    }

    if (query.username) {
      filter.username = {
        $regex: query.username
      }
    }

    return filter
  }
})
