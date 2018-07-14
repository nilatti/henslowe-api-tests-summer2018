import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'
import EditablePlay from './PlayShow'

class PlaysSubComponent extends Component {

  state = {
    plays: this.props.plays
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updatePlaysList()
    }
  }

  loadPlaysFromServer () {
    axios.get(`/api/authors/${this.props.author_id}/plays.json`)
    .then(response => {
      this.setState({ plays: response.data })
    })
    .catch(error => console.log(error))
  }

  updatePlaysList() {
    axios.get(`/api/authors/${this.props.author_id}/plays.json`)
    .then(response => {
      this.setState({ plays: response.data })
    })
    .catch(error => console.log(error))
  }

  render () {
    const plays = this.state.plays.map((play) => (
      <li key={play.id}>
        <Link to={`/plays/${play.id}`}>
          {play.title}
        </Link>
      </li>
    ))

    return (
      <div id='plays'>
        <ul>
          {plays}
        </ul>
      </div>
    )
  }
}

export default PlaysSubComponent
