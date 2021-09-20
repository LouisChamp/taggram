import "../styles/sidebar.scss"
import Profile from "./Profile"
import Comment from "./Comment"
import React, { useRef } from "react"
import axios from "axios"

function Sidebar(props) {
  // Props
  const { post, user, setPost } = props

  // React Hooks
  const newCommentRef = useRef(null)

  // Constant values
  const API_BASE_URL = "https://taggram.herokuapp.com"

  const handleSubmitComment = event => {
    const comment = newCommentRef.current.value

    if (comment !== "") {
      axios
        .post(`${API_BASE_URL}/posts/${post.uuid}/comments?stable=true`, {
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
          console.log(newPost)
          setPost(newPost)
        })
        .catch(console.log)
    }
  }

  return (
    <div className="sidebar">
      <Profile
        username={post.user.username}
        location={post.location.city + ", " + post.location.country}
      />
      <div className="comments">
        {post.comments.map(comment => (
          <Comment
            key={comment.user.username + comment.created_at}
            author={comment.user.username}
            message={comment.message}
            createdAt={comment.created_at}
            avatarId={comment.avatarId}
          />
        ))}
      </div>
      <div className="comments-footer">
        <div className="comment-meta">
          <div className="comment-count">
            {post.comments.length} comentário
            {post.comments.length === 1 ? "" : "s"}
          </div>
          <div className="comment-date">9 de Outubro</div>
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
