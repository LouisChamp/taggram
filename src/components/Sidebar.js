import "../styles/sidebar.scss"
import Sticky from "react-sticky-el"
import Profile from "./Profile"

function Sidebar(props) {
  const { username, location, image, postId, comments } = props

  return (
    <Sticky topOffset={-80}>
      <div className="sidebar">
        <Profile
          username={username}
          location={location}
          image={image}
          postId={postId}
        />
      </div>
    </Sticky>
  )
}

export default Sidebar
