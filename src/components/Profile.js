import "../styles/profile.scss"
import ProfileIcon from "./ProfileIcon"

function Profile(props) {
  const { username, location, userAvatarId } = props

  return (
    <div className="profile">
      <ProfileIcon isHeaderIcon="false" userAvatarId={userAvatarId} />
      <div className="textContainer">
        <span className="postAuthor">{username}</span>
        <span className="location">{location}</span>
      </div>
    </div>
  )
}

export default Profile
