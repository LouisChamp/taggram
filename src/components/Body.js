import React, { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Card from "./Card"
import loader from "../images/ajax-loader.gif"
import "../styles/body.scss"
import getRandomInt from "../helper/random"

function Body({ user }) {
  // React Hooks
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/post")
      .then(response => {
        // Workaround for avatars not working from database
        let avatarMap = new Map()
        avatarMap.set(user.username, user.avatarId)
        response.data.comments.forEach(comment => {
          if (!avatarMap.has(comment.user.username))
            avatarMap.set(comment.user.username, getRandomInt(1, 70))
        })
        response.data.avatarMap = avatarMap
        // end Workaround

        setPost(response.data)
        setIsLoading(false)
      })
      .catch(console.log)
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
        <Card image={post.photo} />
        <Sidebar post={post} user={user} updateCurrentPost={setPost} />
      </div>
    </div>
  )
}

export default Body
