import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext.js"

const Signup = () => {
  const [formData, setFormData] = useState({})
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post("/api/user/signup", formData)
      setLoading(false)
      console.log(data)
      if (data) {
        toast.success(data.message, {
          duration: 4000,
          icon: "🤩",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message, {
        duration: 4000,
        style: {
          background: "#333",
          borderRadius: "10px",
          color: "#fff",
        },
      })
      setIsAuthenticated(false)
    }
  }
  if (isAuthenticated) {
    navigate("/")
  }
  return (
    <div className="p-3 max-w-lg mx-auto text-white">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-white/20 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-white/20 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-white/20 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <div className="flex gap-2 mt-5">
          <p className="">Have an account ?</p>
          <Link to={"/signin"}>
            <span className="text-blue-500">Sign in&gt;</span>
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Signup
