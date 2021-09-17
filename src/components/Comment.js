import "../styles/comment.scss"
import ProfileIcon from "./ProfileIcon"
import getRandomInt from "../helper/random"

function Comment(props) {
  const { author, message, createdAt } = props

  return (
    <div className="comment">
      <ProfileIcon isHeaderIcon={false} userAvatarId={getRandomInt(1, 70)} />
      <div className="text-container">
        <p className="comment-container">
          <span className="author">{author}</span>
          <span className="message">{message}</span>
        </p>
        <div className="hoursAgo">{createdAt}h</div>
      </div>
    </div>
  )
}

export default Comment
