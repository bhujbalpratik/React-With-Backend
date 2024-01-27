export const signup = (req, res) => {
  const { username, email, password } = req.body
  res.json({ username, email, password })
}

export const signin = (req, res) => {
  res.send("User Home")
}
