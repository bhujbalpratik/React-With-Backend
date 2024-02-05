import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from "./App"
import Signup from "./components/Sign-up"
import Signin from "./components/Sign-in"
import { Profile } from "./components/Profile"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"
import { useAuth } from "./contexts/AuthContext"
const Layout = () => {
  const { setUser, setIsAuthenticated, setLoading } = useAuth()
  useEffect(() => {
    setLoading(true)
    axios
      .get("/api/user/profile")
      .then((res) => {
        setUser(res.data.user)
        setIsAuthenticated(true)
        setLoading(false)
      })
      .catch((err) => {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  })
  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}
export default Layout
