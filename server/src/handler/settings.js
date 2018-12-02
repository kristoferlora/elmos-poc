/**
 * @module handler/electricMeter
 */
import express from 'express'

import {
  settingsLib
} from '../lib'

const router = express.Router()

// /settings
router.post("/update", settingsLib.update)

module.exports = router
