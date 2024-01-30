import bcryptjs from "bcryptjs"
import { USER } from "../models/user.models.js"
import { sendCookie } from "../utils/features.js"

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  const user = await USER.find({ email, username })
  if (user) {
    return res
      .status(404)
      .json({ success: false, message: "User Already Exist" })
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
