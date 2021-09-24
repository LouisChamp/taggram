import "../styles/comment.scss"
import ProfileIcon from "./ProfileIcon"

function Comment({ author, message, timeAgo, avatarId }) {
  return (
    <div className="comment">
      <ProfileIcon isHeaderIcon={false} userAvatarId={avatarId} />
      <div className="text-container">
        <p className="comment-container">
          <span className="author">{author}</span>
          <span className="message">{message}</span>
        </p>
        <div className="hoursAgo">{timeAgo}</div>
      </div>
    </div>
  )
}

export default Comment
