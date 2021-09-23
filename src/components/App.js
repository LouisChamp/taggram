import "../styles/App.scss"
import Header from "./Header"
import Body from "./Body"
import getRandomInt from "../helper/random"
import React, { useState, useEffect } from "react"
import axios from "axios"
import loader from "../images/ajax-loader.gif"

function App() {
  // React Hooks
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/me")
      .then(response => {
        setUser({ ...response.data, avatarId: getRandomInt(1, 70) })
        setIsLoading(false)
      })
      .catch(console.log)
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
