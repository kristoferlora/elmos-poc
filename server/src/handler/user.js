/**
 * @module handler/user
 */
import express from 'express'

const router = express.Router()

// /users/create
router.post("/create", create)
// /users/update
router.post("/update/:id", update)
// /users || /useres/uuid
router.get("/:id?", getUsers)

module.exports = router
