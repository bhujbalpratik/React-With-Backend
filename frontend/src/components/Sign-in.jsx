import axios from "axios"
import { useState } from "react"
import { Link, json, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.js"
import toast from "react-hot-toast"

const Signin = () => {
  const [formData, setFormData] = useState({})

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const { data } = await axios.post("/api/user/signin", formData)
      console.log(data)
      if (data) {
        toast.success(data.message, {
          duration: 4000,
          icon: "😎",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
        setIsAuthenticated(true)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setErrorMsg(error.response.data.message)
      toast.error(error.response.data.message, {
        duration: 4000,
        style: {
          background: "#333",
          borderRadius: "10px",
          color: "#fff",
        },
      })
      setError(true)
    }
  }
  if (isAuthenticated) navigate("/")

  return (
    <div className="p-3 max-w-lg mx-auto text-white">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p className="">Dont have an Account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign up&gt;</span>
        </Link>
      </div>
      <p className="text-red-600">
        {error ? <p className="text-red-600 mt-2">{errorMsg}</p> : null}
      </p>
    </div>
  )
}
export default Signin
