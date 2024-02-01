import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Toaster } from "react-hot-toast"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./components/Sign-in.jsx"
import Signup from "./components/Sign-up.jsx"
import Header from "./components/Header.jsx"
import { Profile } from "./components/Profile.jsx"
import { AuthContextProvider } from "./contexts/AuthContext.js"

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  return (
    <AuthContextProvider value={{ isAuthenticated, setIsAuthenticated }}>
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
    </AuthContextProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
)
