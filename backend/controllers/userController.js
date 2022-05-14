import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error("Fill all fields")
  }

  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  // Check for user email
  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
      photo: user.photo,
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

export { registerUser, loginUser }
