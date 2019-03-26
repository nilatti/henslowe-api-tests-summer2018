import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap'

class TheaterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: this.props.city || '',
      mission_statement: this.props.mission_statement || '',
      name: this.props.name || '',
      phone_number: this.props.phone_number || '',
      state: this.props.state || '',
      street_address: this.props.street_address || '',
      website: this.props.website || '',
      zip: this.props.zip || '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      city: this.state.city,
      id: this.props.id,
      mission_statement: this.state.mission_statement,
      name: this.state.name,
      phone_number: this.state.phone_number,
      state: this.state.state,
      street_address: this.state.street_address,
      website: this.state.website,
      zip: this.state.zip,
    }, "theater")
  }

  render() {
    // update states to be all 50 with outside ref
    // figure out why text area is small for mission statement.
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
          <FormGroup controlId="website">
            <Col componentClass={ControlLabel}  md={2}>
              Website
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="website"
                name="website" value={this.state.website} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="streetAddress">
            <Col componentClass={ControlLabel} md={2}>
              Street Address
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="street address"
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
                <option value="OH">Ohio</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="zip">
            <Col componentClass={ControlLabel}  md={2}>
              Zip Code
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="zip"
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
                placeholder="phone number"
                name="phone_number" value={this.state.phone_number} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="missionStatement">
            <Col componentClass={ControlLabel}  md={2}>
              Mission Statement
            </Col>
            <Col md={5}>
              <FormControl
                as="textarea"
                rows="30"
                placeholder="mission statement"
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
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  city: PropTypes.string,
  id: PropTypes.number,
  mission_statement: PropTypes.string,
  name: PropTypes.string,
  phone_number: PropTypes.string,
  state: PropTypes.string,
  street_address: PropTypes.string,
  website: PropTypes.string,
  zip: PropTypes.string,
}

export default TheaterForm