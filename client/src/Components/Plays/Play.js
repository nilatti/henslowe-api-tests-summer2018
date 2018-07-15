import axios from 'axios'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'


class Play extends Component {

  handleDeleteClick = () => {
    console.log('inside play handle delete click', this.props.id)
    this.props.handleDeleteClick(this.props.id)
  }

  render () {
    console.log('inside play render', this.props)
    return (
      <div>
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
      </div>
    )
  }
}

Play.propTypes = {
  author: PropTypes.string,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Play
