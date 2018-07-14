import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import axios from 'axios'

import AuthorForm from './AuthorForm'
import AuthorShow from './AuthorShow'
import PlaysSubComponent from '../Plays/PlaysSubComponent'

class EditableAuthor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      test: true,
      author: {
        birthdate: '',
        deathdate: '',
        first_name: '',
        gender: '',
        id: 0,
        last_name: '',
        middle_name: '',
        nationality: '',
        plays: []
      }
    }
  }
  closeForm = () => {
    this.setState({ editFormOpen: false })
  }
  componentDidMount = () => {
    this.loadAuthorFromServer(this.props.match.params.authorId)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadAuthorFromServer(this.props.match.params.authorId)
    }
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  handleSubmit = (author) => {
    this.props.onFormSubmit(author)
    this.closeForm()
  }
  loadAuthorFromServer = (authorId) => {
    axios.get(`/api/authors/${authorId}.json`)
    .then(response => {
      this.setState({ author: response.data })
    })
    .catch(error => console.log(error))
  }
  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  render () {
    if (this.state.editFormOpen) {
      return (
        <AuthorForm
          id={this.state.author.id}
          first_name={this.state.author.first_name}
          middle_name={this.state.author.middle_name}
          last_name={this.state.author.last_name}
          birthdate={this.state.author.birthdate}
          deathdate={this.state.author.deathdate}
          nationality={this.state.author.nationality}
          gender={this.state.author.gender}
          plays={this.state.author.plays}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return(
        <AuthorShow
        key={this.state.author.id}
        id={this.state.author.id}
        first_name={this.state.author.first_name}
        middle_name={this.state.author.middle_name}
        last_name={this.state.author.last_name}
        birthdate={this.state.author.birthdate}
        deathdate={this.state.author.deathdate}
        nationality={this.state.author.nationality}
        gender={this.state.author.gender}
        plays={this.state.author.plays}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        />
      )
    }
  }
}

EditableAuthor.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default EditableAuthor
