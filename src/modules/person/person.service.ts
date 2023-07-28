import { PersonRepository } from '../../repositories/Person.repository'

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
      lean,
      select: {
        __v: 0
      }
    })
    const totalItems = PersonRepository.countDocuments({ filter })
    return Promise.all([result, totalItems])
  }
})
