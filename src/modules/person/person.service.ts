import { PersonRepository } from '../../repositories/Person.repository'
import { PersonInput } from '../../schemas/Person.schema'
import { ObjectId } from '../../utils'

export const PersonService = Object.freeze({
  getAllPersons: (
    query: Record<string, unknown>,
    limit: number,
    skip: number,
    lean = true
  ) => {
    const filter = PersonRepository.filterQuery(query)
    const result = PersonRepository.findManyAndPaginate({
      filter,
      limit,
      skip,
      options: { lean },
      select: {
        __v: 0
      }
    })
    const totalItems = PersonRepository.countDocuments({ filter })
    return Promise.all([result, totalItems])
  },

  getOnePerson: (id: string) => {
    return PersonRepository.findOneById(id, {
      select: {
        __v: 0
      }
    })
  },

  createPerson: (person: PersonInput) => {
    return PersonRepository.create(person)
  },

  updatePerson: (id: string, person: PersonInput) => {
    return PersonRepository.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: person },
      { options: { new: true } }
    )
  },

  deletePerson: (id: string) =>
    PersonRepository.deleteOne({ _id: ObjectId(id) })
})
