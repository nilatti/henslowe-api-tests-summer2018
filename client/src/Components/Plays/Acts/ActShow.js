import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

class ActShow extends Component {
  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.id)
  }

  render () {
    console.log('act show called', this.props)
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.act.id}</h2>
            <p>
              {this.props.act.summary}
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

ActShow.propTypes = {
  act_number: PropTypes.number.isRequired,
  summary: PropTypes.string,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default ActShow
