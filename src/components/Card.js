import "../styles/card.scss"
import blank from "../images/blank-image.png"
import { useContext } from "react"
import { PostContext } from "./Body"

function Card() {
  const post = useContext(PostContext)

  return (
    <div className="card">
      <img
        className="cardImage"
        src={post?.photo ? post.photo : blank}
        alt="card content"
      />
    </div>
  )
}

export default Card
