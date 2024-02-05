import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { AuthContextProvider } from "./contexts/AuthContext.js"
import Layout from "./Layout.jsx"

const LayoutWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  return (
    <AuthContextProvider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      <Layout />
    </AuthContextProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LayoutWrapper />
  </React.StrictMode>
)
