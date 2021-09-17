import "../styles/App.scss"
import Header from "./Header"
import Body from "./Body"
import getRandomInt from "../helper/random"

function App() {
  let avatarId = getRandomInt(1, 70)

  return (
    <div className="App">
      <Header userAvatarId={avatarId} />
      <Body userAvatarId={avatarId} />
    </div>
  )
}

export default App
