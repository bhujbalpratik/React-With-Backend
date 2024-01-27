import express from "express"
import { signin, signup } from "../controllers/user.controller.js"

const router = express()

router.post("/signup", signup)
router.post("/signin", signin)

export default router
