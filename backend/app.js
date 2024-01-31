import express from "express"
import { config } from "dotenv"
import userRouter from "./routes/user.routers.js"
import taskRouter from "./routes/task.routers.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware.js"

config({ path: "./config/.env" })

export const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)

// Error Handler
app.use(errorMiddleware)
