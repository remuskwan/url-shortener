import bcrypt from 'bcrypt'

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
