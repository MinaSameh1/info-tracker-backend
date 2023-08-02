import { ValueOf } from '../types/helper.types'
import { PersonPermissions } from './person.model'
import { UserPermissions } from './user.model'

export const AppPermissions = Object.freeze({
  Person: PersonPermissions.Permissions,
  User: UserPermissions.Permissions
})

export type AppPermissions = typeof AppPermissions

// Get all values of AppPermissions nested object and combine them into a union type
export type IAppPermissionsValues = ValueOf<
  AppPermissions[keyof AppPermissions]
>

export const AppPermissionsValues = Object.values(AppPermissions).reduce(
  (acc: Array<IAppPermissionsValues>, curr) => {
    return acc.concat(Object.values(curr))
  },
  []
)
