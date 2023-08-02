import { CrudPermissions } from '../helpers/permissionsCreator'
import { ValueOf } from '../types/helper.types'
import { PersonPermissions } from './'

export const UserPermissions = new CrudPermissions('user')

const AppPermissions = Object.freeze({
  Person: PersonPermissions.Permissions,
  User: UserPermissions.Permissions
})

type AppPermissions = typeof AppPermissions

// Get all values of AppPermissions nested object and combine them into a union type
type IAppPermissionsValues = ValueOf<AppPermissions[keyof AppPermissions]>

const AppPermissionsValues = Object.values(AppPermissions).reduce(
  (acc: Array<IAppPermissionsValues>, curr) => {
    return acc.concat(Object.values(curr))
  },
  []
)

export { AppPermissions, AppPermissionsValues, IAppPermissionsValues }
