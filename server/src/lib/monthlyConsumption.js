/**
 * @module lib/electricMeter
 */
import db from '../models'
import debugLib from 'debug'
import moment from 'moment'

import {createMonthlyConsumption} from '../seeder'

const debug = debugLib('ems-server:monthlyConsumption')

const getBillableAmount = (prevConsumption, currConsumption, charge) => {
  return (currConsumption - prevConsumption) * charge
}

export const getAll = async (req, res) => {
  const {electricMeterID} = req.body
  if (!electricMeterID) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide an electric meter'
    })
  }
  try {
    const electricMeter = await db.ElectricMeter.findOne({
      where: {
        electricMeterID
      }
    })
    const monthlyConsumptions = await db.MonthlyConsumption.findAll({
      where: {
        electricMeterID
      },
      order: [
        ['createdDate', 'DESC']
      ]
    })

    return res.status(200).json({
      electricMeter,
      monthlyConsumptions
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Something went wrong.',
      error: error.errors
    })
  }
}

export const updateLimit = async (req, res) => {
  const {electricMeterID, newLimit} = req.body
  try {
    let electricMeter = await db.ElectricMeter.findOne({
      where: {
        electricMeterID
      }
    })
    if (!electricMeter) {
      throw new Error('No bill with this ID')
    }    
    electricMeter = await electricMeter.updateAttributes({
      billableAmountLimit: newLimit
    })
    return res.status(200).json({
      electricMeter
    })
  } catch (error) {
    debug(error)
    return res.status(400).json({
      status: 400,
      message: 'Something went wrong',
      error: error.errors
    })
  }
}

// the public methods
export const update = async (req, res) => {
  const {serialKey, consumption} = req.body
  if (!serialKey) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide an electric meter'
    })
  }
  try {
    let electricMeter = await db.ElectricMeter.findOne({
      where: {
        serialKey
      }
    })
    if (!electricMeter) {
      throw new Error("No electric meter found")
    }
    electricMeter = electricMeter.toJSON()

    let settings = await db.Settings.findOne({
      where: {
        name: 'KILOWATTHOURCHARGE'
      }
    })
    settings = settings.toJSON()

    let monthlyConsumption = await db.MonthlyConsumption.findOne({
      where: {
        electricMeterID: electricMeter.electricMeterID
      },
      order: [
        ['createdDate', 'DESC']
      ]
    })
    const now = moment()
    if (now.isAfter(moment(monthlyConsumption.toDate))) {
      const monthlyConsumptionParams = createMonthlyConsumption(electricMeter)
      monthlyConsumption = await db.MonthlyConsumption.create({
        ...monthlyConsumptionParams,
        previousMonthConsumption: monthlyConsumption.consumption,
        consumption,
        billableAmount: getBillableAmount(monthlyConsumption.consumption, consumption, parseInt(settings.value)) // eslint-disable-line max-len
      })
    } else {
      monthlyConsumption = await monthlyConsumption.updateAttributes({
        consumption,
        billableAmount: getBillableAmount(monthlyConsumption.previousMonthConsumption, consumption, parseFloat(settings.value)) // eslint-disable-line max-len
      })

      if (monthlyConsumption.billableAmount >= electricMeter.billableAmountLimit) {
        return res.status(200).json({
          message: 'HALT'
        })
      }
    }
    return res.status(200).json({
      message: 'SUCCESS'
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: `Something went wrong. ${error.message}`,
      error: error.errors
    })
  }
}

export const getStatus = async (req, res) => {
  const {serialKey} = req.body
  try {
    const electricMeter = await db.ElectricMeter.findOne({
      where: {
        serialKey
      }
    })
    const monthlyConsumption = await db.MonthlyConsumption.findOne({
      where: {
        electricMeterID: electricMeter.electricMeterID
      },
      order: [
        ['createdDate', 'DESC']
      ]
    })
    if (monthlyConsumption.billableAmount < electricMeter.billableAmountLimit) {
      return res.status(200).json({
        message: 'PROCEED'
      })
    }
    return res.status(200).json({
      message: 'HALT'
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Something went wrong',
      error: error.errors
    })
  }
}
