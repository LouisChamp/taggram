import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.scss"
import App from "./components/App"
import TimeAgo from "javascript-time-ago"
import pt from "javascript-time-ago/locale/pt"
import { commentLabels, postLabels } from "./helper/time"
import axios from "axios"

TimeAgo.addDefaultLocale(pt)
TimeAgo.addLabels("pt", "commentLabels", commentLabels)
TimeAgo.addLabels("pt", "postLabels", postLabels)
// axios.defaults.baseURL = "https://taggram.herokuapp.com"
axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.withCredentials = true

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
