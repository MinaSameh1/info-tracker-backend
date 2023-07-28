export class CrudPermissions {
  Create: string
  View: string
  Update: string
  Delete: string

  Permissions: {
    Create: string
    View: string
    Update: string
    Delete: string
  }

  constructor(name: string) {
    const nameUpperCased = name.charAt(0).toUpperCase() + name.substring(1)
    this.Create = `CanCreate${nameUpperCased}`
    this.View = `CanView${nameUpperCased}`
    this.Delete = `CanDelete${nameUpperCased}`
    this.Update = `CanUpdate${nameUpperCased}`
    this.Permissions = {
      Create: `CanCreate${nameUpperCased}`,
      View: `CanView${nameUpperCased}`,
      Delete: `CanDelete${nameUpperCased}`,
      Update: `CanUpdate${nameUpperCased}`
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
