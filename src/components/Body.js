import Sidebar from "./Sidebar"
import Card from "./Card"
import React, { useState, useEffect } from "react"
import axios from "axios"
import getRandomInt from "../helper/random"

function Body(props) {
  // Props
  const { userAvatarId } = props

  // Constant values
  const API_BASE_URL = "https://taggram.herokuapp.com"

  // React Hooks
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/post`)
      .then(response => {
        setPost(response.data)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [])

  if (isLoading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="body">
      <div className="container">
        <Card image={post.photo} />
        <Sidebar
          username={post.user.username}
          location={post.location.city + ", " + post.location.country}
          userAvatarId={getRandomInt(1, 70)}
          postId={post.uuid}
          comments={post.comments}
        />
      </div>
    </div>
  )
}

export default Body
