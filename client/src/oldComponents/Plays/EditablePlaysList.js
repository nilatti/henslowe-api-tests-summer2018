import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditablePlay from './EditablePlay'

class EditablePlaysList extends Component {

  render () {
    const plays = this.props.plays.map((play) => (
      <li key={play.id}>
        <Link to={`/plays/${play.id}`}>{play.title}</Link>
      </li>
    ))
    return (
      <div id='plays'>
        <Row>
          <Col md={3}>
          <ul>
            {plays}
          </ul>
          </Col>
          <Col md={9}>
            <Route
              path={`/plays/:playId`}
              render={(props) => (
                <EditablePlay
                  {...props}
                  onDeleteClick={this.props.onDeleteClick}
                  onFormSubmit={this.props.onFormSubmit}
                />
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

EditablePlaysList.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditablePlaysList
