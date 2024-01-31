import bcryptjs from "bcryptjs"
import { USER } from "../models/user.models.js"
import { sendCookie } from "../utils/features.js"

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  const userEmail = await USER.findOne({ email })
  const userName = await USER.findOne({ username })
  if (userEmail || userName) {
    return res.status(400).json({
      success: false,
      message: `${userName ? "username already taken" : "user already exist"}`,
    })
  }
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = await USER.create({
    username,
    email,
    password: hashedPassword,
  })

  sendCookie(newUser, res, 201, "User created successfully")
}

export const signin = async (req, res) => {
  const { email, password } = req.body
  const validUser = await USER.findOne({ email })

  if (!validUser)
    return res.status(401).json({ success: false, message: "User not found" })

  const validPassword = bcryptjs.compareSync(password, validUser.password)
  if (!validPassword)
    return res.status(401).json({ success: false, message: "Invalid Password" })

  sendCookie(validUser, res, 200, `welcome ,${validUser.username}`)
}

export const myProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user })
}

export const signout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({ success: true, message: "User sign-out successfully" })
}
