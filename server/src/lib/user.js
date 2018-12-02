/**
 * @module lib/user
 */
import db from '../models'
import debugLib from 'debug'
import bcrypt from 'bcrypt'
import moment from 'moment'

export const findUserWhere = (where) => {
  const user = db.User.findOne({where})
  return user
}

export const create = async (req, res) => {
  const {
    firstName,
    lastName,
    type,
    username,
    password,
    unit_number,
    street,
    municipality,
    country,
    zipCode,
    phone,
    serialKey,
    billingStartDate
  } = req.body

  const userParams = {
    firstName,
    lastName,
    type,
    username,
    password
  }

  const contactParams = {
    name: `${firstName} ${lastName}`,
    unit_number,
    street,
    municipality,
    country,
    zipCode,
    phone
  }

  let user = await db.User.create(userParams)

  const contact = await db.Contact.create(contactParams)

  user = await user.update({
    contactID: contact.contactID
  })

  if (serialKey) {
    const startDate = billingStartDate || moment().format('YYYY-MM-DD')
    await db.ElectricMeter.create({
      serialKey,
      userID: user.userID,
      billingStartDate: startDate
    })
  }

  return res.status(200).json(user)
}

export const update = async (req, res) => {
  const userID = req.body.id
  const userParams = req.body.user

  let user = await findUserWhere({userID})
  user = await user.update({...userParams})

  return res.status(200).json(user)
}

export const getUsers = async (req, res) => {
  const userID = req.body.id
  try {
    if (userID) {
      const user = await findUserWhere({userID})

      return res.status(200).json(user)
    } else {
      const users = await db.User.findAll()

      return res.status(200).json(users)
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Could not retrieve user/s'
    })
  }
}
