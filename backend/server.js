import express from "express"
import path from "path"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import quizRoutes from "./routes/quizRoutes.js"

dotenv.config()

import connectDB from "./config/db.js"
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", userRoutes)
app.use("/api/quiz", quizRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Sunucu çalışır durumda..."))
}

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`))
