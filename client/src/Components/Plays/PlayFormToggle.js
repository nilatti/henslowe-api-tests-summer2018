import { Button, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, { Component } from 'react'

import PlayForm from './PlayForm.js'

class PlayFormToggle extends Component { //opens form for create action
  constructor (props) {
    super (props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true })
  }

  handleFormSubmit = (play) => {
    this.props.handleFormClose()
    this.props.onFormSubmit(play)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <PlayForm
          play={this.props.play}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.props.handleFormClose}
        />
      );
    } else {
      return (
        <Button bsStyle="info" className="button-new-item"
            onClick={this.handleFormOpen}
          >
            <Glyphicon glyph='glyphicon glyphicon-plus' /> Add New Play
        </Button>
      );
    }
  }
}

PlayFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default PlayFormToggle
