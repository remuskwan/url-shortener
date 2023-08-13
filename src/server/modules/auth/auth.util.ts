import { scryptSync, randomInt, timingSafeEqual } from 'node:crypto'
import bcrypt from 'bcrypt'

export const createVfnToken = () => {
  return randomInt(0, 1000000).toString().padStart(6, '0')
}

export const createTokenHash = (token: string, email: string) => {
  return scryptSync(token, email, 64).toString('base64')
}

export const compareHashes = (token: string, email: string, hash: string) => {
  return timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(createTokenHash(token, email))
  )
}

export const hashPassword = async (password: string) => {
  //The number of times the plain password is salted. Set to a value that balances security and performance.
  const saltRounds = 10

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds)
    // Hash password
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Error hashing password')
  }
}

export const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}
