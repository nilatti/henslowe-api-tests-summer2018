import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

class CharacterShow extends Component {
  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.character.id)
  }

  render () {
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.character.name}</h2>
            <p>
              {this.props.character.description}
            </p>
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
          <p>
            {this.props.summary}
          </p>
        </Row>
      </div>
    )
  }
}

CharacterShow.propTypes = {
  character: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}

export default CharacterShow
