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

class ActForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: this.props.act.number,
      play_id: this.props.play_id,
      summary: this.props.act.summary,
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
      number: this.state.number,
      id: this.props.act.id,
      play_id: this.state.play_id,
      summary: this.state.summary,
    })
  }

  render() {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="number">
            <Col componentClass={ControlLabel} md={2}>
              Act Number
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="act number"
                name="number" value={this.state.number} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="summary">
            <Col componentClass={ControlLabel} md={2}>
              Summary
            </Col>
            <Col md={5}>
              <FormControl
                componentClass="textarea"
                rows="10"
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

ActForm.defaultProps = {
  act: {
    number: '',
    summary: ''
  }
}

ActForm.propTypes = {
  act: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default ActForm