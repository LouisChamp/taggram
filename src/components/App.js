import "../styles/App.scss"
import Header from "./Header"
import Body from "./Body"
import getRandomInt from "../helper/random"
import React, { useState, useEffect, useReducer } from "react"
import axios from "axios"
import loader from "../images/ajax-loader.gif"

const userAvatarId = getRandomInt(1, 70)
export const StateContext = React.createContext()
export const DispatchContext = React.createContext()
export const UserContext = React.createContext()

const mapReducer = (state, action) => {
  switch (action.type) {
    case "map/setItems":
      const map = new Map(state)
      action.payload.forEach(comment => {
        if (!map.has(comment.username)) {
          map.set(comment.username, comment.avatarId)
        }
      })
      return map
    case "map/get":
      return state
    default:
      throw new Error("Invalid action")
  }
}

function App() {
  // React Hooks
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarMap, dispatchAvatarMap] = useReducer(mapReducer, new Map())

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/me")
      .then(response => {
        setUser(response.data)
        dispatchAvatarMap({
          type: "map/setItems",
          payload: [
            {
              username: response.data.username,
              avatarId: userAvatarId,
            },
          ],
        })
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
    <UserContext.Provider value={user}>
      <DispatchContext.Provider value={dispatchAvatarMap}>
        <StateContext.Provider value={avatarMap}>
          <div className="App">
            <Header />
            <Body />
          </div>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </UserContext.Provider>
  )
}

export default App
