type PermissionsType<T extends string> = {
  readonly Create: `CanCreate${T}`
  readonly Read: `CanRead${T}`
  readonly Update: `CanUpdate${T}`
  readonly Delete: `CanDelete${T}`
}

export class CrudPermissions<T extends string> {
  Create: `CanCreate${Capitalize<T>}`
  Read: `CanRead${Capitalize<T>}`
  Update: `CanUpdate${Capitalize<T>}`
  Delete: `CanDelete${Capitalize<T>}`

  Permissions: PermissionsType<Capitalize<T>>

  constructor(name: T) {
    const nameUpperCased = (name.charAt(0).toUpperCase() +
      name.substring(1)) as Capitalize<T>
    this.Create = `CanCreate${nameUpperCased}`
    this.Read = `CanRead${nameUpperCased}`
    this.Delete = `CanDelete${nameUpperCased}`
    this.Update = `CanUpdate${nameUpperCased}`
    this.Permissions = {
      Create: this.Create,
      Read: this.Read,
      Delete: this.Delete,
      Update: this.Update
    } as const
  }
}

export function checkPermissions(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  requiredPermissions.every(perm => userPermissions.includes(perm))
  return false
}
