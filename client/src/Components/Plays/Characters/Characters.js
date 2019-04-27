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

// import {
//   deleteCharacter
// } from '../../../api/acts'

class Characters extends Component {
  state = {
    acts: this.props.acts,
    errorStatus: '',
  }

  // async deleteCharacter(actId) {
  //   const response = await deleteCharacter(actId)
  //   if (response.status >= 400) {
  //     this.setState({
  //       errorStatus: 'Error deleting character'
  //     })
  //   } else {
  //     this.setState({
  //       acts: this.state.acts.filter(character =>
  //         character.id != actId
  //       )
  //     })
  //   }
  // }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div>
            <h2>Characters</h2>
            <Switch>
            <Route
              path={`/plays/:playId/acts/:actId`}
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
                <EditableCharactersList acts={this.props.acts} onDeleteClick={this.props.onDeleteClick} play_id={this.props.play_id} />
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
  acts: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default Characters