/**
 * @module lib/login
 */
import db from '../models'
import bcrypt from 'bcrypt'
import moment from 'moment'

import {
  generateUserToken
} from '../utils'

export const login = async (req, res) => {
  const {email, password} = req.body

  const user = await db.User.findOne({where: {email}})

  if (!user) {
    throw new Error('Invalid username and password combination.')
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw new Error('Invalid username and password combination')
  }

  const token = await generateUserToken(user.toJSON())

  return res.status(200).json({
    token
  })
}
