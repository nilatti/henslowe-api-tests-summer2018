import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import React, { Component } from 'react'

import axios from 'axios'

import Plays from '../Plays/Plays'
import AuthorForm from './AuthorForm'

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

  componentDidMount = () => {
    this.loadAuthorFromServer(this.props.match.params.authorId)
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.loadAuthorFromServer(this.props.match.params.authorId)
    }
  }

  closeForm = () => {
    this.setState({ editFormOpen: false })
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

class AuthorShow extends Component { //eventually make this a dumb component that just receives an author object
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id)
  }

  render () {
    let dates = this.props.birthdate //tk
    if (this.props.deathdate != null ) {
      dates = dates.concat(" to " + this.props.deathdate)
    }

    return (
      <Col md={12}>
      <Row>
        <Col md={3}>
          <h3>
            {this.props.first_name} {this.props.middle_name} {this.props.last_name}
          </h3>
          <p>  
            {dates}<br />
            {this.props.nationality}
          </p>
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
          >
            <Glyphicon glyph="pencil" />
          </span>
          <span
            className='right floated trash icon'
            onClick={this.handleDeleteClick}
          >
            <Glyphicon glyph="glyphicon glyphicon-trash" />
          </span>
        </Col>
        <Col md={9}>
          <Plays plays={this.props.plays} />
        </Col>
      </Row>
      <hr />
      </Col>
    )
  }
}

AuthorShow.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string,
  middle_name: PropTypes.string,
  last_name: PropTypes.string,
  birthdate: PropTypes.string,
  deathdate: PropTypes.string,
  nationality: PropTypes.string,
  gender: PropTypes.string,
  plays: PropTypes.array.isRequired,
}

export default EditableAuthor
