import "../styles/sidebar.scss"
import Profile from "./Profile"
import Comment from "./Comment"
import React, { useRef } from "react"
import axios from "axios"
import TimeAgo from "javascript-time-ago"
import { commentStyle, postStyle } from "../helper/time"
import getRandomInt from "../helper/random"

function Sidebar({ post, user, updateCurrentPost, avatarId }) {
  // React Hooks
  const newCommentRef = useRef(null)
  const commentsRef = useRef(null)

  const timeAgo = new TimeAgo("pt")

  // Update post's comment section with new comments and scroll down to the latest comment
  // Async Await method used here alternatively to promise chaining to demonstrate proficiency
  const handleSubmitComment = async event => {
    const comment = newCommentRef.current.value

    if (comment !== "") {
      try {
        const res = await axios.post(`/posts/${post.uuid}/comments`, {
          username: user.username,
          message: comment,
        })
        newCommentRef.current.value = ""
        // Workaround for avatars not showing from API
        let newAvatarMap = new Map(post.avatarMap)
        newAvatarMap.set(user.username, avatarId)
        res.data.forEach(comment => {
          if (!newAvatarMap.has(comment.user.username))
            newAvatarMap.set(comment.user.username, getRandomInt(1, 70))
        })
        // end Workaround

        updateCurrentPost({
          ...post,
          comments: res.data,
          avatarMap: newAvatarMap,
        })
        scrollDown(commentsRef)
      } catch (err) {
        handleErrors(err)
      }
    }
  }

  const handleErrors = error => {
    if (error.response) {
      if (error.response.status === 500) {
        window.alert("Comentário não enviado, tente novamente.")
      }
    }
    console.log(error)
  }

  const scrollDown = ref => {
    ref.current.scrollTop = ref.current.scrollHeight
  }

  return (
    <div className="sidebar">
      <Profile
        username={post?.user?.username}
        location={
          post?.location && post.location.city + ", " + post.location.country
        }
        avatarId={post?.avatarMap.get(post.user.username)}
      />
      <div className="comments" ref={commentsRef}>
        {post ? (
          post.comments.map(comment => (
            <Comment
              key={comment.user.username + comment.created_at}
              author={comment.user.username}
              message={comment.message}
              timeAgo={timeAgo.format(
                Date.parse(comment.created_at),
                commentStyle
              )}
              avatarId={post.avatarMap.get(comment.user.username)}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="post-footer">
        <div className="post-meta">
          <div className="post-comment-count">
            {post && (
              <>
                {post.comments.length} comentário
                {post.comments.length !== 1 && "s"}
              </>
            )}
          </div>
          <div className="post-date">
            {post && timeAgo.format(Date.parse(post.created_at), postStyle)}
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
