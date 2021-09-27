import "../styles/App.scss"
import Header from "./Header"
import Body from "./Body"
import getRandomInt from "../helper/random"
import React, { useState, useEffect } from "react"
import axios from "axios"
import loader from "../images/ajax-loader.gif"

const avatarId = getRandomInt(1, 70)

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
      .finally(() => {
        setIsLoading(false)
      })
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
      <Header user={user} avatarId={avatarId} />
      <Body user={user} avatarId={avatarId} />
    </div>
  )
}

export default App
