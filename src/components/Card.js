import "../styles/card.scss"

function Card(props) {
  const { image } = props
  return (
    <div className="card">
      <img className="cardImage" src={image} alt="card content" />
    </div>
  )
}

export default Card
