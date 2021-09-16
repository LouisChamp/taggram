import Sidebar from "./Sidebar"
import Cards from "./Cards"
import React, { useState, useEffect } from "react"
import axios from "axios"

function Body() {
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
    return <div className="container">Loading . . .</div>
  }

  return (
    <body className="body">
      <div className="container">
        <Cards />
        <Sidebar
          username={post.user.username}
          location={post.location.city + ", " + post.location.country}
          image={post.user.avatar}
          postId={post.uuid}
          comments={post.comments}
        />
      </div>
    </body>
  )
}

export default Body
