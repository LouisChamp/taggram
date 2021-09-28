import "../styles/profileIcon.scss"
import image from "../images/defaultAvatar.png"

function ProfileIcon({ isHeaderIcon, avatar }) {
  return (
    <img
      className={isHeaderIcon ? "current-user__avatar" : "comment-user__avatar"}
      src={avatar ? avatar : image}
      alt="profileIcon"
    />
  )
}

export default ProfileIcon
