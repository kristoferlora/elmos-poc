/**
 * @module lib/electricMeter
 */
import db from '../models'
import debugLib from 'debug'
import bcrypt from 'bcrypt'
import moment from 'moment'

const findElectricMeterWhere = (where) => {
  const user = db.ElectricMeter.findOne({where})
  return user
}

export const create = async (req, res) => {
  const {
    serialKey,
    userID,
    billingStartDate
  } = req.body

  let electricMeter = await db.ElectricMeter.create({
    serialKey,
    userID,
    billingStartDate
  })

  return res.status(200).json(electricMeter)
}

export const update = async (req, res) => {
  const electricMeterID = req.body.id
  const electricMeterParams = req.body.electricMeter

  let em = await findElectricMeterWhere({electricMeterID})
  em = await em.update({...electricMeterParams})

  return res.status(200).json(em)
}

export const getElectricMeters = async (req, res) => {
  const electricMeterID = req.body.id
  try {
    if (electricMeterID) {
      const em = await findElectricMeterWhere({electricMeterID})

      return res.status(200).json(em)
    } else {
      const ems = await db.ElectricMeter.findAll()

      return res.status(200).json(ems)
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Could not retrieve electric meters'
    })
  }

}
