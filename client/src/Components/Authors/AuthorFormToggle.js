import { Button, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, { Component } from 'react'

import AuthorForm from './AuthorForm.js'

class AuthorFormToggle extends Component { //opens form for create action
  constructor (props) {
    super (props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true })
  }

  handleFormClose = () => {
    this.setState({ isOpen: false })
  }

  handleFormSubmit = (author) => {
    this.handleFormClose()
    this.props.onFormSubmit(author)
  }

  render() {
    if (this.state.isOpen) {
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
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div>
          <Button bsStyle="info"
            onClick={this.handleFormOpen}
          >
            <Glyphicon glyph='glyphicon glyphicon-plus' /> Add New Author
          </Button>
        </div>
      );
    }
  }
}

AuthorFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default AuthorFormToggle
