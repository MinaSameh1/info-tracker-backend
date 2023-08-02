import { UserDocument } from '../models/user.model'

export interface TokenPayload
  extends Pick<UserDocument, '_id' | 'roles' | 'permissions'> {}
