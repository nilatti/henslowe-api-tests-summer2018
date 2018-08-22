import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'

class TheaterForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: this.props.name || '',
      street_address: this.props.street_address || '',
      city: this.props.city || '',
      state: this.props.state || '',
      zip: this.props.zip || '',
      phone_number: this.props.phone_number || '',
      website: this.props.website || '',
      mission_statement: this.props.mission_statement || '',
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      id: this.props.id,
      name: this.state.name,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      phone_number: this.state.phone_number,
      website: this.state.website,
      mission_statement: this.state.mission_statement,

    })
  }

  render () {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} md={2}>
              Name
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="name"
                name="name" value={this.state.name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="streetAddress">
            <Col componentClass={ControlLabel} md={2}>
              Street Address
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="Street Address"
                name="street_address" value={this.state.street_address} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="city">
            <Col componentClass={ControlLabel}  md={2}>
              City
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="city"
                name="city" value={this.state.city} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="state">
            <Col componentClass={ControlLabel}  md={2}>
              State
            </Col>
            <Col md={5}>
              <FormControl componentClass="select" name="state" value={this.state.state} onChange={this.handleChange}>
                <option value="MI">Michigan</option>
                <option value="VA">Virginia</option>
                <option value="NY">New York</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="zipCode">
            <Col componentClass={ControlLabel} md={2}>
              Zip Code
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="Zip Code"
                name="zip" value={this.state.zip} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="phoneNumber">
            <Col componentClass={ControlLabel} md={2}>
              Phone Number
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="Phone Number"
                name="phone_number" value={this.state.phone_number} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="Website">
            <Col componentClass={ControlLabel} md={2}>
              Website
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="Website"
                name="website" value={this.state.website} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="missionStatement">
            <Col componentClass={ControlLabel} md={2}>
              Mission Statement
            </Col>
            <Col md={5}>
              <FormControl
                type="textarea"
                placeholder="Mission Statement"
                name="mission_statement" value={this.state.mission_statement} onChange={this.handleChange} />
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

TheaterForm.propTypes = {
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

export default TheaterForm
