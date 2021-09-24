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
          {location === undefined ? "" : location}
        </span>
      </div>
    </div>
  )
}

export default Profile
