import "../styles/sidebar.scss"
import Sticky from "react-sticky-el"
import Profile from "./Profile"
import Comment from "./Comment"

function Sidebar(props) {
  const { username, location, userAvatarId, postId, comments } = props

  return (
    // <Sticky topOffset={-80}>
    <div className="sidebar">
      <Profile
        username={username}
        location={location}
        userAvatarId={userAvatarId}
        postId={postId}
      />
      <div className="comments">
        {comments.map(comment => (
          <Comment
            key={comment.user.username + comment.created_at}
            author={comment.user.username}
            message={comment.message}
            createdAt={comment.created_at}
          />
        ))}
      </div>
      <div className="comments-footer">
        <div className="comment-meta">
          <div className="comment-count">{"X"} comentários</div>
          <div className="comment-date">Enviar</div>
        </div>
        <div className="add-comment">
          <input className="comment-text" placeholder="Add a comment..." />
          <div className="comment-submit">Enviar</div>
        </div>
      </div>
    </div>
    // </Sticky>
  )
}

export default Sidebar
