import React, { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Card from "./Card"
import loader from "../images/ajax-loader.gif"
import "../styles/body.scss"

function Body({ user }) {
  // React Hooks
  const [post, setPost] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/post")
      .then(response => {
        setPost(response.data)
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))

    return () => {}
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
        <Sidebar post={post} user={user} updateCurrentPost={setPost} />
      </div>
    </div>
  )
}

export default Body
