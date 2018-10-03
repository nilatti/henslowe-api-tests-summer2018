import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link, Redirect } from 'react-router-dom'

import { deleteItem, getItem } from '../../../api/crud'

import CharacterShow from './CharacterShow'
import CharacterForm from './CharacterForm'

class EditableCharacter extends Component {
  constructor(props){
    super(props)
    this.state = {
      editFormOpen: false,
      character: null,
    }
  }

  async loadCharacterFromServer (characterId) {
    const response = await getItem(characterId, "character")
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching character' })
    } else {
      this.setState({ character: response.data })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        character: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  closeForm = () => {
    console.log('inside close form');
    this.setState({ editFormOpen: false });
  }

  componentDidMount = () => {
      this.loadCharacterFromServer(this.props.match.params.characterId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.character === null || prevProps.match.params.characterId !== this.props.match.params.characterId) {
      this.loadCharacterFromServer(this.props.match.params.characterId);
    }
  }

  onEditClick = () => {
    this.openForm()
  }

  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (character) => {
    this.props.onFormSubmit(character)
    this.closeForm()
  }

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  render () {
    if (this.state.editFormOpen) {
      return(
        <CharacterForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play_id={this.props.play_id}
        />
      )
    }
    if (this.state.character === null) {
      return (
        <div>Loading!</div>
      )
    }
    return (
      <CharacterShow
        character={this.state.character}
        handleDeleteClick={this.props.onDeleteClick}
        handleEditClick={this.onEditClick}
      />
    )
  }
}

EditableCharacter.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default EditableCharacter
