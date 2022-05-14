import express from "express"

import { getQuiz, createQuiz } from "../controllers/quizController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getQuiz)
router.post("/", protect, createQuiz)

export default router
