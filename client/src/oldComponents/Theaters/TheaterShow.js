import PropTypes from 'prop-types';
import { Glyphicon, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'

import { createPlay } from '../../api/plays'

import PlayFormToggle from '../Plays/PlayFormToggle'
import PlaysSubComponent from '../Plays/PlaysSubComponent'

class TheaterShow extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // async createPlay (play) {
  //   const response = await createPlay(play)
  //   if (response.status >= 400) {
  //     this.setState({ errorStatus: 'Error creating play' })
  //   } else {
  //     this.addNewPlay(response.data)
  //   }
  // }

  // addNewPlay = (newPlay) => {
  //   this.setState({
  //     plays: [...this.state.plays, newPlay]
  //   })
  // }

  // handleCreateFormSubmit = (play) => {
  //   this.createPlay(play)
  // }
  //
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id)
  }

  render () {

    return (
      <Col md={12}>
      <Row>
        <Col md={3}>
          <h3>
            {this.props.name}
          </h3>
          <h4>
            {this.props.mission_statement}
          </h4>

          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
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
        <Col md={12}>
          <p>
            <strong>Address:</strong><br />
            {this.props.street_address}<br />
            {this.props.city}, {this.props.state}  {this.props.zip}<br />
          </p>
          <p>
            <strong>Phone Number:</strong><br />
            {this.props.phone_number}
          </p>
          <p>
            <strong>Website:</strong><br />
            <a href={`http://${this.props.website}`}>{this.props.website}</a>
          </p>
        </Col>
      </Row>
      <hr />
      </Col>
    )
  }
}

TheaterShow.propTypes = {
  city: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  mission_statement: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  street_address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
}

export default TheaterShow
