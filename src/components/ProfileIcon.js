import "../styles/profileIcon.scss"
import getRandomInt from "../helper/random"

function ProfileIcon(props) {
  const { isHeaderIcon, image } = props

  let randomId = getRandomInt(1, 70)

  let profileImage = image ? image : `https://i.pravatar.cc/150?img=${randomId}`

  return (
    <img
      className={
        isHeaderIcon === "true"
          ? "current-user__avatar"
          : "comment-user__avatar"
      }
      src={profileImage}
      alt="profileIcon"
    />
  )
}

export default ProfileIcon
