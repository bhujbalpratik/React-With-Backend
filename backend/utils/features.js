import jwt from "jsonwebtoken"

export const sendCookie = (user, res, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
  return res
    .status(statusCode)
    .cookie(token, { httpsOnly: true, maxAge: 15 * 60 * 60 * 1000 })
    .json({ success: true, message })
}
