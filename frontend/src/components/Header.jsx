import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.js"

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const logOutHandler = async (e) => {
    try {
      const { data } = await axios.get("/api/user/signout")
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
      }
    } catch (error) {
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
  return (
    <header>
      <div className="relative w-full bg-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className=" items-center space-x-2 inline-flex">
            <span className="font-bold">ToDo</span>
          </div>
          <div className="block ml-auto mr-12">
            <ul className="inline-flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-sm font-semibold text-gray-800 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-sm font-semibold text-gray-800 hover:underline"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="block">
            <Link to={"/signin"}>
              <button
                type="button"
                className="rounded-md bg-[#172842] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {isAuthenticated ? "Sign Out" : "Sign In"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
