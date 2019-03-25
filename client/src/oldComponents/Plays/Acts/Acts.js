import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'

import EditableActsList from './EditableActsList'
import EditableAct from './EditableAct'
import ActFormToggle from './ActFormToggle'

class Acts extends Component {
  state = {
    errorStatus: '',
  }

  render () {
    return (
      <Row>
        <Col md={12} >
          <div>
            <h2>Acts</h2>
            <EditableActsList
              acts={this.props.acts}
              play_id={this.props.play_id}
              onFormSubmit={this.props.onFormSubmit}
              onDeleteClick={this.props.onDeleteClick}
            />
          <ActFormToggle
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

Acts.propTypes = {
  acts: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default Acts
