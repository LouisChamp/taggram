import "../styles/header.scss"
import logo from "../images/taggram.png"
import ProfileIcon from "./ProfileIcon"
import { useContext } from "react"
import { StateContext, UserContext } from "./App"

function Header() {
  const avatarMap = useContext(StateContext)
  const user = useContext(UserContext)

  return (
    <>
      <div className="header">
        <div className="header__container">
          <img className="logo" src={logo} alt="taggram logo" />
          <div className="current-user">
            <div className="current-user__username">
              {user ? user.username : "Loading..."}
            </div>
            <ProfileIcon
              isHeaderIcon="true"
              userAvatarId={avatarMap?.get(user?.username)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
