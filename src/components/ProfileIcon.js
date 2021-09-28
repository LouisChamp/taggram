import "../styles/profileIcon.scss"
import defaultAvatar from "../images/default-avatar.png"

function ProfileIcon({ isHeaderIcon, avatar }) {
  return (
    <img
      className={isHeaderIcon ? "current-user__avatar" : "comment-user__avatar"}
      src={avatar ?? defaultAvatar}
      alt="profileIcon"
    />
  )
}

export default ProfileIcon
