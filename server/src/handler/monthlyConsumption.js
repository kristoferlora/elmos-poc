/**
 * @module handler/monthlyConsumption
 */
import express from 'express'

import {
  monthlyConsumptionLib
} from '../lib'

const router = express.Router()

// monthlyConsumptions/get
// must provide an electricMeterID
router.post('/get', monthlyConsumptionLib.getAll)

// monthlyConsumptions/update
router.post('/update', monthlyConsumptionLib.updateLimit)

module.exports = router
