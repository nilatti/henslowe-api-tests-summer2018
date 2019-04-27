import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import {
  Col,
  Glyphicon,
  Row
} from 'react-bootstrap'

import {
  Link
} from "react-router-relative-link"

import EditableCharacter from './EditableCharacter'

class EditableCharactersList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      acts: this.props.acts
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

  handleDeleteClick = (actId) => {
    this.props.onDeleteClick(actId)
  }

  render() {
    const play_id = this.props.play_id
    const acts = this.props.acts.map((character) => (
      <li key={character.id}>
        <Link to={`../${play_id}/acts/${character.id}`}>{character.number}</Link> <span
          className='right floated edit icon'
          onClick={this.props.handleEditClick}
        >
          <Glyphicon glyph="pencil" />
        </span>
        <span
          className='right floated trash icon'
          onClick={() => this.handleDeleteClick(character.id)}
        >
          <Glyphicon glyph="glyphicon glyphicon-trash" />
        </span>
      </li>
    ))
    //
    return (
      <div id='acts'>
        <Row>
        <Col md={2}>
        <ul>
          {acts}
        </ul>
        </Col>
        </Row>
      </div>
    )
  }
}

EditableCharactersList.propTypes = {
  acts: PropTypes.array.isRequired,
  play_id: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditableCharactersList