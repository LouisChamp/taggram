import "../styles/App.scss"
import Header from "./Header"
import Body from "./Body"
import getRandomInt from "../helper/random"
import React, { useState, useEffect } from "react"
import axios from "axios"
import loader from "../images/ajax-loader.gif"

function App() {
  // Constant values
  const API_BASE_URL = "https://taggram.herokuapp.com"

  // React Hooks
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  let avatarId = getRandomInt(1, 70)

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/me`)
      .then(response => {
        setUser(response.data)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [])

  if (isLoading) {
    return (
      <div className="app-loading">
        <img src={loader} alt="Loading . . ." width="150" />
      </div>
    )
  }

  let userWithId = { ...user }
  userWithId.avatarId = avatarId

  return (
    <div className="App">
      <Header user={userWithId} />
      <Body user={userWithId} />
    </div>
  )
}

export default App
