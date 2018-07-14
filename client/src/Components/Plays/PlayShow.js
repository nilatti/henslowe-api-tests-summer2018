import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'



class EditablePlay extends Component {
  state = {
    play: {
      title: '',
      author: {
        first_name: '',
        last_name: ''
      }
    }
  }

  componentDidMount = () => {
    this.loadPlayFromServer()
  }

  loadPlayFromServer = () => {
    console.log('loading play from server')
    axios.get(`/api/plays/${this.props.match.params.playId}.json`)
    .then(response => {
      this.setState({ play: response.data})
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <Play title={this.state.play.title} author={`${this.state.play.author.first_name} ${this.state.play.author.last_name}`} />
    )
  }
}

class Play extends Component {
  render () {
    return (
      <div>
          <h2>{this.props.title}</h2>
          by {this.props.author}
      </div>
    )
  }
}

export default EditablePlay
