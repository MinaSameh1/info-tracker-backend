import { PersonPermissions } from './person.model'
import { UserPermissions } from './user.model'

export const Permissions = Object.freeze({
  Person: PersonPermissions.Permissions,
  User: UserPermissions.Permissions
})
