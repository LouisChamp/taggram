import "../styles/profile.scss"
import ProfileIcon from "./ProfileIcon"

function Profile({ username, location, avatarId }) {
  return (
    <div className="profile">
      <ProfileIcon isHeaderIcon={false} userAvatarId={avatarId} />
      <div className="text-container">
        <span className="post-author">
          {username === undefined ? "" : username}
        </span>
        <span className="location">
          {username === undefined ? "Loading..." : location}
        </span>
      </div>
    </div>
  )
}

export default Profile
