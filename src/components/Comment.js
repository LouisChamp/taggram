import "../styles/comment.scss"
import ProfileIcon from "./ProfileIcon"
import getRandomInt from "../helper/random"

function Comment(props) {
  const { author, message, createdAt } = props

  return (
    <div className="comment">
      <ProfileIcon isHeaderIcon={false} userAvatarId={getRandomInt(1, 70)} />
      <div className="comment-text">
        <div className="commentContainer">
          <div className="author">{author}</div>
          <div className="message">{message}</div>
        </div>
        <div className="hoursAgo">{createdAt} + h</div>
      </div>
    </div>
  )
}

export default Comment
