import argon2 from 'argon2'

export function hash(value: string): Promise<string> {
  return argon2.hash(value, {
    // why argon2id https://crypto.stackexchange.com/a/72437
    type: argon2.argon2id
  })
}

export function compare(value: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, value)
}
