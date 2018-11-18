/**
 * @module handler/electricMeter
 */
import express from 'express'

const router = express.Router()

// /electric-meter/create
router.post("/create", create)
// /electric-meter/update
router.post("/update/:id", update)
// /electric-meter || /useres/uuid
router.get("/:id?", getElectricMeter)

module.exports = router
