import "../styles/profileIcon.scss"

function ProfileIcon(props) {
  const { isHeaderIcon, userAvatarId } = props

  return (
    <img
      className={
        isHeaderIcon === "true"
          ? "current-user__avatar"
          : "comment-user__avatar"
      }
      src={`https://i.pravatar.cc/150?img=${userAvatarId}`}
      alt="profileIcon"
    />
  )
}

export default ProfileIcon
