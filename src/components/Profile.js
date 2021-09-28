import "../styles/profile.scss"
import ProfileIcon from "./ProfileIcon"

function Profile({ username, city, country, avatar }) {
  return (
    <div className="profile">
      <ProfileIcon isHeaderIcon={false} avatar={avatar} />
      <div className="text-container">
        <span className="post-author">{username && username}</span>
        <span className="location">
          {city ? city + ", " + country : "Loading..."}
        </span>
      </div>
    </div>
  )
}

export default Profile
