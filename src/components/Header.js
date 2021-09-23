import "../styles/header.scss"
import logo from "../images/taggram.png"
import ProfileIcon from "./ProfileIcon"

function Header({ user }) {
  return (
    <>
      <div className="header">
        <div className="header__container">
          <img className="logo" src={logo} alt="taggram logo" />
          <div className="current-user">
            <div className="current-user__username">{user.username}</div>
            <ProfileIcon isHeaderIcon="true" userAvatarId={user.avatarId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
