import axios from 'axios'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link, Redirect } from 'react-router-dom'

import Play from './Play'
import PlayForm from './PlayForm'

class EditablePlay extends Component {
  state = {
    editFormOpen: false,
    play: {
      author: {
        first_name: '',
        id: 0,
        last_name: '',
      },
      title: '',
      id: 0
    },
    toPlaysList: false,
  }

  closeForm = () => {
    this.setState({ editFormOpen: false })
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

  onEditClick = () => {
    this.openForm()
  }

  handleFormClose = () => {
    this.closeForm()
  }
  handleSubmit = (play) => {
    this.props.onFormSubmit(play)
    this.closeForm()
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

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  render () {
    if (this.state.toPlaysList === true) {
      return <Redirect to='/plays' />
    }
    if (this.state.editFormOpen) {
      return(
        <PlayForm id={this.state.play.id} title={this.state.play.title} author_id={this.state.play.author.id} genre={this.state.play.genre} />
      )
    }
    return (
      <Play
        author={`${this.state.play.author.first_name} ${this.state.play.author.last_name}`}
        id={this.state.play.id}
        handleDeleteClick={this.onDeleteClick}
        handleEditClick={this.onEditClick}
        title={this.state.play.title}
      />
    )
  }
}

export default EditablePlay
