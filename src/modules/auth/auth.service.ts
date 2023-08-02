import { UserDocument, UserModel } from '../../models/user.model'
import { signJwt } from '../../services/jwt.service'

export const authService = Object.freeze({
  findUserByUserName: async (username: string) => {
    return UserModel.findOne({ username }).lean().exec()
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
