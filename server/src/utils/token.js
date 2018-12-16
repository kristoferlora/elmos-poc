/**
 * @module utils/token
 */
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import uuid from 'uuid/v4'

import db from '../models'

const DEFAULT_TOKEN_EXPIRY = 60 * 60 // 60 minutes
// const TOKEN_EXPIRY_REFRESH_THRESHOLD = 60 * 30 // 30 minutes

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.AUTH_SECRET)
}

const decodeToken = (token) => {
  return jwt.decode(token)
}

const generateToken = async (payload, options) => {
  return jwt.sign(
    payload,
    process.env.AUTH_SECRET,
    {
      jwtid: uuid(),
      ...options
    }
  )
}

const generateUserToken = async (user, expiry = DEFAULT_TOKEN_EXPIRY, extra) => {
  const model = db.User

  const payload = {
    userID: user.userID,
    name: `${user.firstName} ${user.lastName}`,
    type: db.RecordType.User.VALUES[user.recordTypeID],
    ...extra
  }
  /* Enable if implementing refresh token logic */
  const options = {
  //   expiresIn: expiry
  }
  return generateToken(payload, options)
}

const refreshToken = async (token) => {
  /* Enable if implementing refresh token logic */
  // const currentTime = new Date().getTime() / 1000
  // const payload = await jwt.decode(token)
  // const aboutToExpire = (payload
  //   && (currentTime + TOKEN_EXPIRY_REFRESH_THRESHOLD) >= payload.exp
  //   && currentTime <= payload.exp
  // )

  // if (aboutToExpire) {
  //   const options = {
  //     jwtid: uuid(),
  //     expiresIn: DEFAULT_TOKEN_EXPIRY
  //   }
  //   return await jwt.sign(_.omit(payload, ['exp', 'jti', 'exp', 'iat']),
  //     process.env.AUTH_SECRET,
  //     options
  //   )
  // }
}

export {
  generateToken,
  generateUserToken,
  verifyToken,
  decodeToken,
  refreshToken
}
