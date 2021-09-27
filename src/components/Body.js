import React, { useState, useEffect, useReducer, useContext } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Card from "./Card"
import loader from "../images/ajax-loader.gif"
import "../styles/body.scss"
import getRandomInt from "../helper/random"
import { DispatchContext, StateContext } from "./App"

const profileAvatarId = getRandomInt(1, 70)

export const PostContext = React.createContext()
export const PostDispatcher = React.createContext()

const postReducer = (state, action) => {
  switch (action.type) {
    case "post/get":
      return state
    case "post/set":
      return action.payload
    case "post/updateComments":
      return {
        ...state,
        comments: action.payload,
      }
    default:
      return new Error("Invalid action")
  }
}

function Body() {
  // React Hooks
  const [post, dispatchPost] = useReducer(postReducer, null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useContext(DispatchContext)
  const avatarMap = useContext(StateContext)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/post")
      .then(response => {
        // Workaround for avatars not showing from API
        // Set post owner avatar ID
        dispatch({
          type: "map/setItems",
          payload: [
            {
              username: response.data.user.username,
              avatarId: profileAvatarId,
            },
          ],
        })
        // Set comment authors's avatar IDS
        const commentAvatarIds = []
        response.data.comments.forEach(comment => {
          if (!avatarMap.has(comment.user.username))
            commentAvatarIds.push({
              username: comment.user.username,
              avatarId: getRandomInt(1, 70),
            })
        })
        dispatch({
          type: "map/setItems",
          payload: commentAvatarIds,
        })
        // end Workaround

        dispatchPost({ type: "post/set", payload: response.data })
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Ajax loader
  if (isLoading) {
    return (
      <div className="body-loading">
        <img src={loader} alt="Loading . . ." width="150" />
      </div>
    )
  }

  return (
    <PostDispatcher.Provider value={dispatchPost}>
      <PostContext.Provider value={post}>
        <div className="body">
          <div className="body__container">
            <Card />
            <Sidebar />
          </div>
        </div>
      </PostContext.Provider>
    </PostDispatcher.Provider>
  )
}

export default Body
