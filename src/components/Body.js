import React, { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Card from "./Card"
import loader from "../images/ajax-loader.gif"
import "../styles/body.scss"
import getRandomInt from "../helper/random"

function Body(props) {
  // Props
  const { user } = props

  // Constant values
  const API_BASE_URL = "https://taggram.herokuapp.com"

  // React Hooks
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/post`)
      .then(response => {
        response.data.comments.map(
          comment => (comment.avatarId = getRandomInt(1, 70))
        )
        setPost(response.data)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [])

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
        <Sidebar post={post} user={user} setPost={setPost} />
      </div>
    </div>
  )
}

export default Body
