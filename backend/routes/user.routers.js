import express from "express"
import {
  myProfile,
  signin,
  signout,
  signup,
} from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", isAuthenticated, signout)
router.get("/profile", isAuthenticated, myProfile)

export default router
