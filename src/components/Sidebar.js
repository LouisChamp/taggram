import "../styles/sidebar.scss"
import Profile from "./Profile"
import Comment from "./Comment"
import React, { useRef } from "react"
import axios from "axios"
import TimeAgo from "javascript-time-ago"
import { commentStyle, postStyle } from "../helper/time"
import getRandomInt from "../helper/random"

function Sidebar({ user, postDispatcher, avatarMapDispatcher }) {
  // React Hooks
  const newCommentRef = useRef(null)
  const commentsRef = useRef(null)

  const timeAgo = new TimeAgo("pt")

  // Update post's comment section with new comments and scroll down to the latest comment
  // Async Await method used here alternatively to promise chaining to demonstrate proficiency
  const handleSubmitComment = async event => {
    const comment = newCommentRef.current.value

    if (comment !== "" && postDispatcher({ type: "post/get" })) {
      try {
        const response = await axios.post(`/posts/${post.uuid}/comments`, {
          username: user.username,
          message: comment,
        })
        newCommentRef.current.value = ""

        // Workaround for avatars not showing from API
        const commentAvatarIds = response.data.comments.map(comment => ({
          username: comment.user.username,
          avatarId: getRandomInt(1, 70),
        }))
        avatarMapDispatcher({
          type: "map/setItems",
          payload: commentAvatarIds,
        })

        // end Workaround

        postDispatcher({
          type: "post/updateComments",
          payload: response.data,
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

  const post = postDispatcher({ type: "post/get" })

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
              avatarId={avatarMapDispatcher({
                type: "map/getItem",
                payload: comment.user.username,
              })}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="post-footer">
        <div className="post-meta">
          <div className="post-comment-count">
            {post &&
              post.comments.length.toString() +
                " comentário".concat(post.comments.length === 1 ? "" : "s")}
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
