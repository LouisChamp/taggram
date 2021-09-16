import "../styles/header.scss"
import logo from "../images/taggram.png"

function Header() {
  return (
    <>
      <div className="header">
        <div className="header__container">
          <img className="logo" src={logo} alt="instagram logo" />
          <div className="current-user">
            <div className="current-user__username">LUIZ GUSTAVO</div>
            <img
              className="current-user__avatar"
              alt="Curret user avatar"
              src={`https://i.pravatar.cc/150?img=7`}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
