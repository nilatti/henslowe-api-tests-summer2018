import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

class ActShow extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     acts: this.props.acts
  //   }
  // }
  //
  // async createAct (playId, act) {
  //   const response = await createAct(playId, act)
  //   if (response.status >= 400) {
  //     this.setState({ errorStatus: 'Error creating play' })
  //   } else {
  //     this.addNewAct(response.data)
  //   }
  // }
  //
  // addNewAct = (newAct) => {
  //   this.setState({
  //     acts: [...this.state.acts, newAct]
  //   })
  // }
  //
  // handleCreateFormSubmit = (act) => {
  //   this.createAct(this.props.id, act)
  // }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.id)
  }

  render () {
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.act_number}</h2>
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
