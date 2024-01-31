import { USER } from "../models/user.models.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res
      .status(404)
      .json({ success: "false", message: "you should sign-in first" })
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await USER.findById(decoded._id)

  const { password: hashedPassword, ...rest } = user._doc

  req.user = rest

  next()
}
