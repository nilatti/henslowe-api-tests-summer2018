import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'

import EditableCharactersList from './EditableCharactersList'
import EditableCharacter from './EditableCharacter'
import CharacterFormToggle from './CharacterFormToggle'

class Characters extends Component {
  state = {
    errorStatus: '',
  }

  render () {
    return (
      <Row>
        <Col md={12} >
          <div>
            <h2>Characters</h2>
            
          <CharacterFormToggle
            isOpen={false}
            onFormSubmit={this.props.onFormSubmit}
            play_id={this.props.play_id}
          />
          </div>
        </Col>
        <hr />
      </Row>
    )
  }
}

Characters.propTypes = {
  characters: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default Characters
