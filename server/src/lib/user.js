/**
 * @module lib/user
 */
import db from '../models'
import debugLib from 'debug'
import bcrypt from 'bcrypt'
import moment from 'moment'

const debug = debugLib('elmos-server:user')

export const findUserWhere = (query) => {
  const user = db.User.findOne(query)
  return user
}

export const create = async (req, res) => {
  const {
    firstName,
    lastName,
    type,
    username,
    password,
    permanentAddress,
    phone,
    serialKey,
    billingStartDate,
    billableAmountLimit
  } = req.body

  const userParams = {
    firstName,
    lastName,
    type,
    username,
    password,
    permanentAddress,
    mobilePhone,
    phone
  }

  let user = await db.User.create(userParams)

  if (serialKey) {
    const startDate = billingStartDate || moment().format('YYYY-MM-DD')
    await db.ElectricMeter.create({
      serialKey,
      userID: user.userID,
      billingStartDate: startDate,
      address: permanentAddress,
      billableAmountLimit: billableAmountLimit
    })
  }

  return res.status(200).json(user)
}

export const update = async (req, res) => {
  const userID = req.body.id
  const userParams = req.body.user

  let user = await findUserWhere({where: {userID}})
  user = await user.update({...userParams})

  return res.status(200).json(user)
}

export const searchUser = async (req, res) => {
  const {name} = req.body
  const user = await findUserWhere({
    where: {
      $or: {
        firstName: {
          $ilike: `%${name}%`
        },
        lastName: {
          $ilike: `%${name}%`
        },
        email: {
          $ilike: `%${name}%`
        }
      }
    },
    attributes: [
      'firstName',
      'lastName',
      'userID'
    ]
  })
  return res.status(200).json({
    data: user
  })
}

export const getUsers = async (req, res) => {
  const userID = req.body.id
  try {
    if (userID) {
      const user = await findUserWhere({where: {userID}})

      return res.status(200).json(user)
    } else {
      const users = await db.User.findAll({
        include: [{
          model: db.RecordType,
          as: 'recordType'
        }]
      })

      return res.status(200).json(users)
    }
  } catch (error) {
    debug(error)
    return res.status(400).json({
      status: 400,
      message: 'Could not retrieve user/s'
    })
  }
}
