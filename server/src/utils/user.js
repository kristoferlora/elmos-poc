import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR) || 10
/**
 * function generate a hash given a plain text password
 * @param {String} password - plain text password
 * @return {String} hashed password
 */
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
  return bcrypt.hashSync(password, salt)
}
