/**
 * @module handler/electricMeter
 */
import express from 'express'

import {
  electricMeterLib
} from '../lib'

const router = express.Router()

// /electric-meter/create
router.post("/create", electricMeterLib.create)
// /electric-meter/update
router.post("/update/:id", electricMeterLib.update)
// /electric-meter || /useres/uuid
router.get("/:id?", electricMeterLib.getElectricMeters)

module.exports = router
