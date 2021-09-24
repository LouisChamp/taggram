import "../styles/card.scss"
import blank from "../images/blank-image.png"

function Card({ image }) {
  return (
    <div className="card">
      <img
        className="cardImage"
        src={image ? image : blank}
        alt="card content"
      />
    </div>
  )
}

export default Card
