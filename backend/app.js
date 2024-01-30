import express from "express"
import { config } from "dotenv"
import userRouter from "./routes/user.routers.js"

config({ path: "./config/.env" })

export const app = express()

// middlewares
app.use(express.json())

// routes
app.use("/api/user", userRouter)
