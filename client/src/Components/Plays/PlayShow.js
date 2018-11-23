import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import Acts from './Acts/Acts'
import Characters from './Characters/Characters'
import PlayInfo from './PlayInfo'

class PlayShow extends Component {

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.id)
  }

  render () {
    return (
      <div>
        <Row>
          <Col md={3}>
            <h2>{this.props.play.title}</h2>
            <div>
              by {this.props.author}
            </div>
            <div>
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
            </div>
            <div>
              <Link to={{ pathname: `/plays/${this.props.play.id}/characters/`, state: { characters: this.props.play.characters } }}>Characters</Link>
              <Link to={{ pathname: `/plays/${this.props.play.id}/acts/`, state: { acts: this.props.play.acts } }}>Acts</Link>
            </div>
          </Col>

          <Col md={9}>
            <PlayInfo characters={this.props.play.characters}/>
          </Col>
        </Row>
      </div>
    )
  }
}

PlayShow.propTypes = {
  author: PropTypes.string.isRequired,
  play: PropTypes.object.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleActCreateFormSubmit: PropTypes.func.isRequired,
  handleActDeleteClick: PropTypes.func.isRequired,
  handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}

export default PlayShow
