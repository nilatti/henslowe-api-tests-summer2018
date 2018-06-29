import React, { Component } from 'react'
import EditablePlaysList from '../Plays/Plays'
import AuthorForm from './AuthorForm'

import { Glyphicon } from 'react-bootstrap'

class EditableAuthor extends Component {
  state = {
    editFormOpen: false
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

  closeForm = () => {
    this.setState({ editFormOpen: false })
  }

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  render () {
    if (this.state.editFormOpen) {
      return (
        <AuthorForm
          id={this.props.id}
          first_name={this.props.first_name}
          middle_name={this.props.middle_name}
          last_name={this.props.last_name}
          birthdate={this.props.birthdate}
          deathdate={this.props.deathdate}
          nationality={this.props.nationality}
          gender={this.props.gender}
          plays={this.props.plays}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return(
        <AuthorShow
        key={this.props.id}
        id={this.props.id}
        first_name={this.props.first_name}
        middle_name={this.props.middle_name}
        last_name={this.props.last_name}
        birthdate={this.props.birthdate}
        deathdate={this.props.deathdate}
        nationality={this.props.nationality}
        gender={this.props.gender}
        plays={this.props.plays}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        />
      )
    }
  }
}

class AuthorShow extends Component { //eventually make this a dumb component that just receives an author object
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id)
  }

  render () {
    return (
      <div>
        {this.props.first_name} {this.props.last_name}
        <EditablePlaysList plays={this.props.plays} />
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
      </div>
    )
  }
}

export default EditableAuthor
