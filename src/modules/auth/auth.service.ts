import { UserDocument } from '../../models/user.model'
import { UserRepository } from '../../repositories/User.repository'
import { signJwt } from '../../services/jwt.service'

export const authService = Object.freeze({
  findUserByUserName: async (username: string) => {
    return UserRepository.findOneByUserName(username)
  },

  generateToken: async (user: UserDocument) => {
    return signJwt(
      {
        _id: user._id,
        roles: user.roles,
        permissions: user.permissions
      },
      { expiresIn: '1d' }
    )
  }
})
