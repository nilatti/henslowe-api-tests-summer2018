import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'

class CharacterForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      age: this.props.age || '',
      description: this.props.description || '',
      gender: this.props.gender || '',
      name: this.props.name || '',
      play_id: this.props.play_id || {},
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      age: this.state.age || '',
      description: this.state.description || '',
      gender: this.state.gender || '',
      name: this.state.name || '',
      play_id: this.state.play_id || {},
    })
  }

  render () {
    return (
      <Col md={12}>
        <Form horizontal>
          <input type="hidden" value={this.state.play_id} />
          <FormGroup controlId="number">
            <Col componentClass={ControlLabel} md={2}>
              Character Name
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="character name"
                name="name" value={this.state.name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="description">
            <Col componentClass={ControlLabel} md={2}>
              Summary
            </Col>
            <Col md={5}>
              <FormControl
                type="textarea"
                rows="50"
                placeholder="description"
                name="description" value={this.state.description} onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="age">
            <Col componentClass={ControlLabel} md={2}>
              Age
            </Col>
            <Col md={5}>
              <select className="form-control" id="age">
                <option>baby</option>
                <option>child</option>
                <option>teenager</option>
                <option>young adult</option>
                <option>adult</option>
                <option>middle-aged</option>
                <option>senior citizen</option>
              </select>
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

CharacterForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default CharacterForm
