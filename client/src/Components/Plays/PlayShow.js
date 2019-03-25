import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

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

      </div>
    )
  }
}

PlayShow.propTypes = {
  acts: PropTypes.array.isRequired,
  author: PropTypes.string,
  characters: PropTypes.array.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleActCreateFormSubmit: PropTypes.func.isRequired,
  handleActDeleteClick: PropTypes.func.isRequired,
  handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default PlayShow
