/**
 * @module handler/user
 */
import express from 'express'

import {
  userLib
} from '../lib'

const router = express.Router()

// /users/create
router.post("/create", userLib.create)
// /users/update
router.post("/update/:id", userLib.update)
// /users || /useres/uuid
router.get("/:id?", userLib.getUsers)

module.exports = router
