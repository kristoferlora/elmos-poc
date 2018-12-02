/**
 * @module/authGuard
 */
import debugLib from 'debug'
import {verifyToken} from '../utils'

const debug = debugLib('onerent-stockroom: auth-guard')

const authGuard = async (req, res, next) => {
  debug('Accessed Auth Guard', req.url)

  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      await verifyToken(token)

      req.authorized = true
      next()
    } catch (err) {
      return res.status(403).json({
        status: 403,
        message: 'Invalid token.'
      })
    }

  } else {
    return res.status(403).json({
      status: 403,
      message: 'Login required.'
    })
  }
}

export default authGuard
