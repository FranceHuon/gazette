import * as bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword)
}
