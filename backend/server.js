import express from "express"
import { config } from "dotenv"
import mongoConnection from "./data/mongoose.js"
import userRouter from "./routes/user.routers.js"

config({ path: "./config/.env" })

const app = express()

app.use(express.json())
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("Home Page Rendered")
})

mongoConnection()

app.listen(process.env.PORT, () => {
  console.log(`Server is Working On : `)
  console.log(`http://localhost:${process.env.PORT}`)
})
