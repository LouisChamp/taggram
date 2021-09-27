import React, { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Card from "./Card"
import loader from "../images/ajax-loader.gif"
import "../styles/body.scss"
import getRandomInt from "../helper/random"

function Body({ user, avatarId }) {
  // React Hooks
  const [post, setPost] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let mounted = true

    setIsLoading(true)
    axios
      .get("/post")
      .then(response => {
        // Workaround for avatars not showing from API
        let avatarMap = new Map()
        avatarMap.set(response.data.user.username, getRandomInt(1, 70))
        response.data.comments.forEach(comment => {
          if (!avatarMap.has(comment.user.username))
            avatarMap.set(comment.user.username, getRandomInt(1, 70))
        })
        response.data.avatarMap = avatarMap
        // end Workaround
        if (mounted) setPost(response.data)
      })
      .catch(console.log)
      .finally(() => {
        if (mounted) setIsLoading(false)
      })

    return () => (mounted = false)
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
        <Card image={post?.photo} />
        <Sidebar
          post={post}
          user={user}
          updateCurrentPost={setPost}
          avatarId={avatarId}
        />
      </div>
    </div>
  )
}

export default Body
