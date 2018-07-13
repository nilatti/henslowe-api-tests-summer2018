import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types';
import React, { Component } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

class PlayForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      title: this.props.title || '',
      genre: this.props.genre || '',
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDateChange = (date) => {
    this.setState({
     birthdate: date
   })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      author_id: this.props.author_id,
      title: this.state.title,
    })
  }

  render () {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} md={2}>
              Title
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="title"
                name="title" value={this.state.title} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="genre">
            <Col componentClass={ControlLabel} md={2}>
              Genre
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="genre"
                name="genre" value={this.state.genre} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel}  md={2}>
              Publication or first performance date
            </Col>
            <Col md={5}>
              <DatePicker
                name="birthdate"
                selected={this.state.date}
                onChange={this.handleDateChange}
              />
            </Col>
          </FormGroup>
          <Button type="submit" bsStyle="primary" onClick={this.handleSubmit} block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form>
        <hr />
      </Col>
    )
  }
}

PlayForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  first_name: PropTypes.string,
  middle_name: PropTypes.string,
  last_name: PropTypes.string,
  birthdate: PropTypes.string,
  deathdate: PropTypes.string,
  nationality: PropTypes.string,
  gender: PropTypes.string,
  plays: PropTypes.array,
  deathDateVisible: PropTypes.bool,
}

export default PlayForm
