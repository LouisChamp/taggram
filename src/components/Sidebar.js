import "../styles/sidebar.scss"
import Profile from "./Profile"
import Comment from "./Comment"
import React, { useRef } from "react"
import axios from "axios"
import TimeAgo from "javascript-time-ago"
import { commentStyle, postStyle } from "../helper/time"

function Sidebar(props) {
  // Props
  const { post, user, setPost } = props

  // React Hooks
  const newCommentRef = useRef(null)
  const commentsRef = useRef(null)

  const timeAgo = new TimeAgo("pt")

  // Constant values
  const API_BASE_URL = "https://taggram.herokuapp.com"

  const handleSubmitComment = event => {
    const comment = newCommentRef.current.value

    if (comment !== "") {
      axios
        .post(`${API_BASE_URL}/posts/${post.uuid}/comments`, {
          username: user.username,
          message: comment,
        })
        .then(response => {
          newCommentRef.current.value = ""
          let newPost = { ...post }
          newPost.comments.push({
            ...response.data.at(-1),
            avatarId: user.avatarId,
          })
          setPost(newPost)
          scrollDown(commentsRef)
        })
        .catch(handleErrors)
    }
  }

  let handleErrors = error => {
    if (error.response) {
      if (error.response.status === 500) {
        window.alert("Comentário não enviado, tente novamente.")
      }
    }
    console.log(error)
  }

  let scrollDown = ref => {
    ref.current.scrollTop = ref.current.scrollHeight
  }

  return (
    <div className="sidebar">
      <Profile
        username={post.user.username}
        location={post.location.city + ", " + post.location.country}
      />
      <div className="comments" ref={commentsRef}>
        {post.comments.map(comment => (
          <Comment
            key={comment.user.username + comment.created_at}
            author={comment.user.username}
            message={comment.message}
            timeAgo={timeAgo.format(
              Date.parse(comment.created_at),
              commentStyle
            )}
            avatarId={comment.avatarId}
          />
        ))}
      </div>
      <div className="post-footer">
        <div className="post-meta">
          <div className="post-comment-count">
            {post.comments.length} comentário
            {post.comments.length === 1 ? "" : "s"}
          </div>
          <div className="post-date">
            {timeAgo.format(Date.parse(post.created_at), postStyle)}
          </div>
        </div>
        <div className="add-comment">
          <input
            className="comment-text"
            placeholder="Add a comment..."
            ref={newCommentRef}
          />
          <button className="comment-submit" onClick={handleSubmitComment}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
