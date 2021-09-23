import "../styles/card.scss"

function Card({ image }) {
  return (
    <div className="card">
      <img className="cardImage" src={image} alt="card content" />
    </div>
  )
}

export default Card
