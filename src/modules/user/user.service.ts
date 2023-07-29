import { hash } from 'argon2'
import { UserRepository } from '../../repositories/User.repository'
import { UserInput } from '../../schemas/User.schema'

export const UserService = Object.freeze({
  getAllUsers: ({
    query,
    limit,
    skip
  }: {
    query: Record<string, unknown>
    limit: number
    skip: number
  }) => {
    const filter = UserRepository.filterQuery(query)
    const result = UserRepository.findManyAndPaginate({
      filter,
      limit,
      skip,
      options: { lean: true },
      select: {
        __v: 0,
        password: 0
      }
    })
    const totalItems = UserRepository.countDocuments(filter)
    return Promise.all([result, totalItems])
  },

  getOneUser: (id: string, lean = true) =>
    UserRepository.findOneById(id, {
      select: { __v: 0, password: 0 },
      options: { lean }
    }),

  createUser: async (user: UserInput) => {
    const password = await hash(user.password)
    return UserRepository.create({ ...user, password })
  },

  updateUser: async (id: string, user: UserInput) => {
    const password = await hash(user.password)
    return UserRepository.findOneAndUpdate(
      { _id: id },
      { ...user, password },
      { options: { new: true } }
    )
  },

  deleteUser: (id: string) => UserRepository.deleteOne({ _id: id })
})
