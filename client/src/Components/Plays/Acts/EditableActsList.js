import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route } from 'react-router-dom'
import { Link } from "react-router-relative-link"

import EditableAct from './EditableAct'

class EditableActsList extends Component {

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

  render () {
    const play_id = this.props.play_id
    const acts = this.props.acts.map((act) => (
      <li key={act.id}>
        <Link to={`../${play_id}/acts/${act.id}`}>{act.act_number}</Link>
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
        <Col md={10}>
        </Col>
        </Row>
      </div>
    )
  }
}

EditableActsList.propTypes = {
  acts: PropTypes.array.isRequired,
  play_id: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditableActsList
