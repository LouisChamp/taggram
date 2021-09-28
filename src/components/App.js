import "../styles/App.scss"
import Header from "./Header"
import Body from "./Body"
import React, { useState, useEffect } from "react"
import axios from "axios"
import loader from "../images/ajax-loader.gif"

function App() {
  // React Hooks
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/me")
      .then(response => {
        setUser(response.data)
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  // Ajax loader technique for better user experience
  if (isLoading) {
    return (
      <div className="app-loading">
        <img src={loader} alt="Loading . . ." width="150" />
      </div>
    )
  }

  return (
    <div className="App">
      <Header user={user} />
      <Body user={user} />
    </div>
  )
}

export default App
