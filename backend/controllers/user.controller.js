import bcryptjs from "bcryptjs"
import { USER } from "../models/user.models.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  const user = await USER.findOne({ email })
  if (user) {
    return res.json({ success: false, message: "User Already Exist" })
  }
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = await USER.create({
    username,
    email,
    password: hashedPassword,
  })
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET)
  return res
    .cookie(token, { httpsOnly: true, maxAge: 15 * 60 * 60 * 1000 })
    .json({ success: true, message: "User created successfully !" })
}

export const signin = async (req, res) => {
  const { email, password } = req.body
  const validUser = await USER.findOne({ email })
  if (!validUser) return res.json({ success: false, message: "User not found" })
  const validPassword = bcryptjs.compareSync(password, validUser.password)
  if (!validPassword)
    return res.status(401).json({ success: false, message: "Invalid Password" })

  return res
    .status(201)
    .json({ success: true, message: `welcome ,${validUser.username}` })
}
