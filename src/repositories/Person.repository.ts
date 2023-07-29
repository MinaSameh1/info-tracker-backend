import { ProjectionType, QueryOptions, Types } from 'mongoose'
import { PersonDocument, PersonModel } from '../models/person.model'
import { PersonInput } from '../schemas/Person.schema'
import { normalizeArabicSpaces } from '../utils'

export const PersonRepository = Object.freeze({
  create: (person: PersonInput): Promise<PersonDocument> =>
    PersonModel.create(person),

  findOneById: (
    id: string | Types.ObjectId,
    {
      select,
      options = { lean: true }
    }: {
      select?: ProjectionType<PersonDocument>
      options?: QueryOptions<PersonDocument>
    }
  ) => PersonModel.findById(id, select, options).exec(),

  findOneByNationalId: (nationalId: string, lean = true) =>
    PersonModel.findOne({ nationalId }, { lean }).exec(),

  findByCreatedBy: (createdBy: Types.ObjectId, lean = true) =>
    PersonModel.find({ createdBy }, { lean }).exec(),

  countDocuments: (filter: Record<string, unknown>) =>
    PersonModel.countDocuments(filter).exec(),

  deleteOne: (filter: Record<string, unknown>) =>
    PersonModel.deleteOne(filter).lean().exec(),

  findOneAndUpdate: (
    filter: Record<string, unknown>,
    update: Record<string, unknown>,
    {
      options = { new: true }
    }: {
      options: QueryOptions<PersonDocument>
    }
  ) => PersonModel.findOneAndUpdate(filter, update, options).exec(),

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
    options?: QueryOptions<PersonDocument>
    select?: ProjectionType<PersonDocument>
  }) =>
    PersonModel.find(filter, select, options)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec(),

  filterQuery: (query: Record<string, unknown>) => {
    const { name, nationalId, status } = query
    const filter: Record<string, unknown> = {}

    if (name) {
      filter.name = {
        $regex: normalizeArabicSpaces(name as string),
        $options: 'i'
      }
    }

    if (nationalId) {
      filter.nationalId = { $regex: nationalId, $options: 'i' }
    }

    if (status) {
      filter.status = status
    }
    return filter
  }
})
