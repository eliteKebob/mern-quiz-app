import express from "express"

import { registerUser, loginUser } from "../controllers/userController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/", registerUser)
router.post("/login", loginUser)

export default router
