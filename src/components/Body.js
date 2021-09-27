import React, { useState, useEffect, useReducer } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Card from "./Card"
import loader from "../images/ajax-loader.gif"
import "../styles/body.scss"
import getRandomInt from "../helper/random"

const profileAvatarId = getRandomInt(1, 70)

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

function Body({ user, avatarMapDispatcher }) {
  // React Hooks
  const [post, dispatchPost] = useReducer(postReducer, null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/post")
      .then(response => {
        // Workaround for avatars not showing from API
        // Set post owner avatar ID
        avatarMapDispatcher({
          type: "map/setItems",
          payload: [
            {
              username: response.data.user.username,
              avatarId: profileAvatarId,
            },
          ],
        })
        // Set comment authors's avatar IDS
        const commentAvatarIds = response.data.comments.map(comment => ({
          username: comment.user.username,
          avatarId: getRandomInt(1, 70),
        }))
        avatarMapDispatcher({
          type: "map/setItems",
          payload: commentAvatarIds,
        })
        // end Workaround

        dispatchPost({ type: "post/set", payload: response.data })
      })
      .catch(console.log)
      .finally(setIsLoading(false))
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
    <div className="body">
      <div className="body__container">
        <Card postDispatcher={dispatchPost} />
        <Sidebar
          user={user}
          postDispatcher={dispatchPost}
          avatarMapDispatcher={avatarMapDispatcher}
        />
      </div>
    </div>
  )
}

export default Body
