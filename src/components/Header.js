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
            <div className="current-user__username">
              {user ? user.username : "Loading..."}
            </div>
            <ProfileIcon isHeaderIcon={true} user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
