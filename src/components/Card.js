import "../styles/card.scss"
import blank from "../images/blank-image.png"

function Card({ postDispatcher }) {
  const photo = postDispatcher({ type: "post/get" })?.photo
  return (
    <div className="card">
      <img
        className="cardImage"
        src={photo ? photo : blank}
        alt="card content"
      />
    </div>
  )
}

export default Card
