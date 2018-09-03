import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import Acts from './Acts/Acts'

class PlayShow extends Component {

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.id)
  }

  render () {
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.title}</h2>
            by {this.props.author}
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <Glyphicon glyph="pencil" />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <Glyphicon glyph="glyphicon glyphicon-trash" />
            </span>
          </Col>
        </Row>
        <Row>
          <Acts
            acts={this.props.acts}
            play_id={this.props.id}
            onFormSubmit={this.props.handleCreateFormSubmit}
            onDeleteClick={this.handleDeleteClick}
          />
        </Row>
      </div>
    )
  }
}

PlayShow.propTypes = {
  acts: PropTypes.array.isRequired,
  author: PropTypes.string,
  handleCreateFormSubmit: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default PlayShow
