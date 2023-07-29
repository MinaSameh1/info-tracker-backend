export class CrudPermissions {
  Create: string
  Read: string
  Update: string
  Delete: string

  Permissions: {
    Create: string
    Read: string
    Update: string
    Delete: string
  }

  constructor(name: string) {
    const nameUpperCased = name.charAt(0).toUpperCase() + name.substring(1)
    this.Create = `CanCreate${nameUpperCased}`
    this.Read = `CanRead${nameUpperCased}`
    this.Delete = `CanDelete${nameUpperCased}`
    this.Update = `CanUpdate${nameUpperCased}`
    this.Permissions = {
      Create: this.Create,
      Read: this.Read,
      Delete: this.Delete,
      Update: this.Update
    }
  }
}

export function checkPermissions(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  for (const perm of requiredPermissions) {
    if (userPermissions.includes(perm)) {
      return true
    }
  }
  return false
}
