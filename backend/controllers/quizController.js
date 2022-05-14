import asyncHandler from "express-async-handler"
import Quiz from "../models/quizModel.js"

const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find({})

  res.status(200).json(quiz)
})

const createQuiz = asyncHandler(async (req, res) => {
  if (
    !req.body.question ||
    !req.body.answer1 ||
    !req.body.answer2 ||
    !req.body.answer3 ||
    !req.body.answer4
  ) {
    res.status(400)
    throw new Error("Please fill all fields")
  }

  const quiz = await Quiz.create({
    question: req.body.question,
    user: req.user.id,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
  })

  res.status(200).json(quiz)
})

export { getQuiz, createQuiz }
