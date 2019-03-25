import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'

class ActForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      act_number: this.props.act_number || '',
      play_id: this.props.play_id || {},
      summary: this.props.summary || '',
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      play_id: this.state.play_id,
      summary: this.state.summary,
      act_number: this.state.act_number,
    })
  }

  render () {
    return (
      <Col md={12}>
        <Form horizontal>
          <input type="hidden" value={this.state.play_id} />
          <FormGroup controlId="number">
            <Col componentClass={ControlLabel} md={2}>
              Act Number
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="act number"
                name="act_number" value={this.state.act_number} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="summary">
            <Col componentClass={ControlLabel} md={2}>
              Summary
            </Col>
            <Col md={5}>
              <FormControl
                type="textarea"
                rows="50"
                placeholder="summary"
                name="summary" value={this.state.summary} onChange={this.handleChange}
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

ActForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default ActForm
