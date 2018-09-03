import moment from 'moment'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class AuthorForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      birthdate: moment(this.props.birthdate),
      deathdate: moment() || '',
      deathDateVisible: this.props.deathdate ? true : false,
      first_name: this.props.first_name || '',
      gender: this.props.gender || '',
      last_name: this.props.last_name || '',
      middle_name: this.props.middle_name || '',
      nationality: this.props.nationality || '',
      plays: this.props.plays,
    }
  }

  addDeathDate = () => {
    this.setState({
      deathDateVisible: true
    })
  }
  handleBirthdateChange = (date) => {
    this.setState({
     birthdate: date
   })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleDeathdateChange = (date) => {
    console.log("death date change", date)
    this.setState({
     deathdate: date
   });
  }
  handleSubmit = (event) => {
    console.log("in handle submit authorform")
    event.preventDefault()
    this.props.onFormSubmit({
      id: this.props.id,
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      birthdate: this.state.birthdate,
      deathdate: this.state.deathdate,
      nationality: this.state.nationality,
      gender: this.state.gender,
      plays: this.state.plays
    }, "author")
  }

  render () {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="firstName">
            <Col componentClass={ControlLabel} md={2}>
              First Name
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="first name"
                name="first_name" value={this.state.first_name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="middleName">
            <Col componentClass={ControlLabel} md={2}>
              Middle Name
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="middle name"
                name="middle_name" value={this.state.middle_name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="lastName">
            <Col componentClass={ControlLabel}  md={2}>
              Last Name
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="last name"
                name="last_name" value={this.state.last_name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="gender">
            <Col componentClass={ControlLabel}  md={2}>
              Gender
            </Col>
            <Col md={5}>
              <FormControl componentClass="select" name="gender" value={this.state.gender} onChange={this.handleChange}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="nonbinary">nonbinary</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="nationality">
            <Col componentClass={ControlLabel} md={2}>
              Nationality
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="nationality"
                name="nationality" value={this.state.nationality} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel}  md={2}>
              Birthdate
            </Col>
            <Col md={5}>
              <DatePicker
                name="birthdate"
                selected={this.state.birthdate}
                onChange={this.handleBirthdateChange}
              />
            </Col>
          </FormGroup>
          { this.state.deathDateVisible
            ?
            <FormGroup>
              <Col componentClass={ControlLabel}  md={2}>
                Deathdate
              </Col>
              <Col md={5}>
                <DatePicker
                  name="deathdate"
                  selected={this.state.deathdate}
                  onChange={this.handleDeathdateChange}
                />
              </Col>
            </FormGroup>
            :
            <Col md={2}>
              <Button type="button" bsStyle="primary" onClick={ () => this.addDeathDate() }>
                Click to add Death date
              </Button>
            </Col>
          }
          <Button type="submit" bsStyle="primary" onClick={this.handleSubmit} block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form>
        <hr />
      </Col>
    )
  }
}

AuthorForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  birthdate: PropTypes.string,
  deathdate: PropTypes.string,
  deathDateVisible: PropTypes.bool,
  first_name: PropTypes.string,
  gender: PropTypes.string,
  last_name: PropTypes.string,
  middle_name: PropTypes.string,
  nationality: PropTypes.string,
  plays: PropTypes.array,
}

export default AuthorForm
