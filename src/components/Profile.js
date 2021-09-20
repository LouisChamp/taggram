import "../styles/profile.scss"
import ProfileIcon from "./ProfileIcon"
import React, { useState, useEffect } from "react"
import getRandomInt from "../helper/random"

function Profile(props) {
  const { username, location } = props

  const [avatarId, setAvatarId] = useState(null)

  useEffect(() => {
    setAvatarId(getRandomInt(1, 70))
  }, [])

  return (
    <div className="profile">
      <ProfileIcon isHeaderIcon={false} userAvatarId={avatarId} />
      <div className="text-container">
        <span className="post-author">{username}</span>
        <span className="location">{location}</span>
      </div>
    </div>
  )
}

export default Profile
