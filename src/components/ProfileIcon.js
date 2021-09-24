import "../styles/profileIcon.scss"
import image from "../images/defaultAvatar.png"

function ProfileIcon({ isHeaderIcon, userAvatarId }) {
  return (
    <img
      className={isHeaderIcon ? "current-user__avatar" : "comment-user__avatar"}
      src={
        userAvatarId ? `https://i.pravatar.cc/150?img=${userAvatarId}` : image
      }
      alt="profileIcon"
    />
  )
}

export default ProfileIcon
