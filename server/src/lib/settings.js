/**
 * @module lib/user
 */
import db from '../models'
import debugLib from 'debug'
import bcrypt from 'bcrypt'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

export const findSettings = async (name) => {
  const setting = await db.Settings.findOne({
    where: {
      name
    }
  })
  return setting
}

export const getSettings = async (req, res) => {
  const settings = await db.Settings.findAll()
  return res.status(200).json(settings)
}

const evaluateValue = (dataType, value) => {
  if (dataType === 'NUMBER') {
    return !isNaN(value)
  }
  if (dataType === 'BOOLEAN') {
    return value === 'false' || value === 'true'
  }
  if (dataType === 'STRING') {
    return !isEmpty(value)
  }
  return false
}

export const update = async (req, res) => {
  let setting = await findSettings(req.body.name)

  if (!evaluateValue(setting.dataType, value)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid value. Does not follow type ${setting.dataType}`
    })
  }

  setting = await setting.update({
    value: req.body.value
  })
  return res.status(200).json(setting)
}
