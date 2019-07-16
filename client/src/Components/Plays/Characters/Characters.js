import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Route,
  Switch
} from 'react-router-dom'
import {
  Redirect
} from 'react-router-dom'

import EditableCharactersList from './EditableCharactersList'
import EditableCharacter from './EditableCharacter'
import CharacterFormToggle from './CharacterFormToggle'

class Characters extends Component {
  state = {
    characters: this.props.characters,
    errorStatus: '',
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div>
            <h2>Characters</h2>
            <Switch>
            <Route
              path={`/plays/:playId/characters/:characterId`}
              render={(props) => (
                <EditableCharacter
                  {...props}
                  onDeleteClick={this.props.onDeleteClick}
                />
              )}
            />
            <Route
              path={`/plays/:playId`}
              render={(props) => (
                <EditableCharactersList characters={this.props.characters} onDeleteClick={this.props.onDeleteClick} play_id={this.props.play_id} />
              )}
            />
            </Switch>
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
  play_id: PropTypes.number.isRequired,
}

export default Characters
