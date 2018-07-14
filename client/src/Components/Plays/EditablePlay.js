import axios from 'axios'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link, Redirect } from 'react-router-dom'

import Play from './Play'

class EditablePlay extends Component {
  state = {
    play: {
      author: {
        first_name: '',
        last_name: ''
      },
      title: '',
      id: 0
    },
    toPlaysList: false,
  }

  componentDidMount = () => {
    this.loadPlayFromServer()
  }

  deletePlay = (playId) => {
    axios.delete(`/api/plays/${playId}`)
    .then(
      this.setState({ toPlaysList: true })
    )
    .catch(error => console.log(error))
  }

  loadPlayFromServer = () => {
    axios.get(`/api/plays/${this.props.match.params.playId}.json`)
    .then(response => {
      this.setState({ play: response.data})
    })
    .catch(error => console.log(error))
  }

  onDeleteClick = (playId) => {
    this.deletePlay(playId)
  }

  render () {
    if (this.state.toPlaysList === true) {
      return <Redirect to='/plays' />
    }
    return (
      <Play title={this.state.play.title} author={`${this.state.play.author.first_name} ${this.state.play.author.last_name}`} id={this.state.play.id} handleDeleteClick={this.onDeleteClick}/>
    )
  }
}

export default EditablePlay
