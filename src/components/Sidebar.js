import "../styles/sidebar.scss"
import Sticky from "react-sticky-el"
import Profile from "./Profile"
import Comment from "./Comment"

function Sidebar(props) {
  const { username, location, userAvatarId, postId, comments } = props

  return (
    <Sticky topOffset={-80}>
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
        <div className="addComment">
          <div className="commentText">Add a comment...</div>
          <div className="postText">Enviar</div>
        </div>
      </div>
    </Sticky>
  )
}

export default Sidebar
