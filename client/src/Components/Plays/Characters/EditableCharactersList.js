import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route } from 'react-router-dom'
import { Link } from "react-router-relative-link"

import EditableCharacter from './EditableCharacter'

class EditableCharactersList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      characters: this.props.characters
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        play: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  render () {
    const play_id = this.props.play_id
    const characters = this.props.characters.map((character) => (
      <li key={character.id}>
        <Link to={`../${play_id}/characters/${character.id}`}>{character.name}</Link>
      </li>
    ))
    //
    return (
      <div id='characters'>
        <ul>
          {characters}
        </ul>
        <hr />
        <Switch>
        <Route
          path={`/plays/:playId/characters/:characterId`}
          render={(props) => (
            <EditableCharacter
              {...props}
              play_id={this.props.play_id}
              onDeleteClick={this.props.onDeleteClick}
              onFormSubmit={this.props.onFormSubmit}
            />
          )}
        />
        </Switch>
      </div>
    )
  }
}

EditableCharactersList.propTypes = {
  characters: PropTypes.array.isRequired,
  play_id: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditableCharactersList
