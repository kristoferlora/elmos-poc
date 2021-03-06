/**
 * @module lib/electricMeter
 */
import db from '../models'
import debugLib from 'debug'
import moment from 'moment'

import {createMonthlyConsumption} from '../seeder'

const debug = debugLib('ems-server:electricMeter')

const findElectricMeterWhere = (where) => {
  const user = db.ElectricMeter.findOne({
    where,
    include: [{
      model: db.User,
      as: 'user'
    }]
  })
  return user
}

export const create = async (req, res) => {
  try {
    const {
      address,
      serialKey,
      user,
      billingStartDate,
      billableAmountLimit
    } = req.body

    const electricMeter = await db.ElectricMeter.create({
      address,
      serialKey,
      userID: user,
      billingStartDate,
      billableAmountLimit
    })

    const monthlyConsumption = createMonthlyConsumption(electricMeter)

    await db.MonthlyConsumption.create(monthlyConsumption)

    return res.status(200).json(electricMeter)
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Something went wrong.',
      error: error.errors
    })
  }
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
      const ems = await db.ElectricMeter.findAll({
        include: [{
          model: db.User,
          as: 'user'
        }],
        order: [
          ['createdDate', 'DESC']
        ]
      })

      return res.status(200).json(ems)
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Could not retrieve electric meters'
    })
  }
}

const findElectricMeter = async (where) => {
  const electricMeter = await db.ElectricMeter.findOne({
    where,
    attributes: [
      'electricMeterID',
      'billableAmountLimit'
    ]
  })
  return electricMeter
}

const KILOWATTHOURCHARGE = 5.3352

const computeBillableAmount = async (prevConsumption, currConsumption) => {
  const setting = await db.Settings.findOne({
    where: {
      name: 'KILOWATTHOURCHARGE'
    }
  })
  const diff = currConsumption - prevConsumption
  return diff * parseFloat(setting.value)
}

const createMonthlyConsumptionFromPreviousMonthsConsumption = async (electricMeterID, consumption) => {
  const prev = await db.MonthlyConsumption.findOne({
    order: [['createdDate', 'DESC']],
    where: {
      electricMeterID
    }
  })
  let curr = null
  if (!prev) {
    // first ever billing
    const now = moment()
    fromDate = now.format('YYYY-MM-DD')
    toDate = now.add(1, 'M').format('YYYY-MM-DD')
    billableAmount = await computeBillableAmount(0, consumption)
    curr = {
      fromDate,
      toDate,
      consumption,
      billableAmount,
      electricMeterID
    }
    return
  } else {
    const fromDate = moment(prev.toDate).add(1, 'D').format('YYYY-MM-DD')
    const toDate = moment(prev.toDate).add(1, 'M').format('YYYY-MM-DD')
    const billableAmount = await computeBillableAmount(prev.consumption, consumption)
    curr = {
      fromDate,
      toDate,
      consumption,
      billableAmount,
      electricMeterID
    }
  }
  curr = await db.MonthlyConsumption.create(curr)
  return curr
}

export const updateConsumption = async (req, res) => {
  const {serialKey, consumption} = req.body
  const today = moment().format('YYYY-MM-DD')
  // get electric meter if it exists
  const electricMeter = await findElectricMeter({serialKey})
  if (!electricMeter) {
    return res.status(400).json({
      status: 400,
      message: 'Serial Key does not exist.'
    })
  }
  // get monthly consumption bill
  let mc = await db.MonthlyConsumption.findOne({
    where: {
      isBilled: false,
      fromDate: {
        gt: today
      },
      toDate: {
        lt: today
      },
      electricMeterID: electricMeter.electricMeterID
    }
  })
  if (!mc) {
    // create new bill
    mc = createMonthlyConsumptionFromPreviousMonthsConsumption(
      electricMeter.electricMeterID,
      consumption
    )
    return res.status(200).json({
      status: 200,
      message: "SUCCESS"
    })
  } else {
    // update current bill
    mc.consumption = consumption
    const diff = await computeBillableAmount(mc.consumption, consumption)
    mc.billableAmount += diff

    if (mc.billableAmount >= (electricMeter.billableAmountLimit * 0.80)) {
      // send warning email that user is almost at limit
      mc.sentWarningEmail = true
    }

    await mc.save()

    let message = "SUCCESS"

    // send a disconnect message if user reaches 95% consumption
    if (mc.billableAmount >= (electricMeter.billableAmountLimit * 0.95)) {
      message = "DISCONNECT"
    }

    return res.status(200).json({
      status: 200,
      message
    })
  }
}

export const getStats = async (req, res) => {
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().endOf('month').format('YYYY-MM-DD')

  const monthlyConsumptionStats = await db.MonthlyConsumption.findAll({
    where: {
      createdDate: {
        between: [startOfMonth, endOfMonth]
      }
    },
    attributes: [[
      db.sequelize.fn('COUNT', db.sequelize.col('monthly_consumption_id')), 'count'
    ], [
      db.sequelize.fn('SUM', db.sequelize.col('consumption')), 'sum'
    ]]
  })

  let stats = monthlyConsumptionStats[0].toJSON()

  stats.average = parseInt(stats.sum, 10) / parseInt(stats.count, 10)

  return res.status(200).json(stats)
}
