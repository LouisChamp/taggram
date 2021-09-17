import React, { useState, useEffect } from "react"
import axios from "axios"
import "../styles/header.scss"
import logo from "../images/taggram.png"
import ProfileIcon from "./ProfileIcon"

function Header(props) {
  // props
  const { userAvatarId } = props
  // Constant values
  const API_BASE_URL = "https://taggram.herokuapp.com"

  // React Hooks
  const [user, setUser] = useState({})

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/me`)
      .then(response => {
        setUser(response.data)
      })
      .catch(console.log)
  }, [])

  return (
    <>
      <div className="header">
        <div className="header__container">
          <img className="logo" src={logo} alt="taggram logo" />
          <div className="current-user">
            <div className="current-user__username">{user.username}</div>
            <ProfileIcon isHeaderIcon="true" userAvatarId={userAvatarId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
