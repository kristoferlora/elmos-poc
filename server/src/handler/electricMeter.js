/**
 * @module handler/electricMeter
 */
import express from 'express'

import {
  electricMeterLib
} from '../lib'

const router = express.Router()

// /electricMeters/create
router.post("/create", electricMeterLib.create)
// /electricMeters/update
router.post("/update/:id", electricMeterLib.update)
// /electricMeters/stats
router.get("/stats", electricMeterLib.getStats)
// /electricMeters || /electricMeters/uuid
router.get("/:id?", electricMeterLib.getElectricMeters)
module.exports = router
