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

class SceneForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: this.props.scene.number,
      act_id: this.props.act_id,
      summary: this.props.scene.summary,
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
      id: this.props.scene.id,
      act_id: this.state.act_id,
      summary: this.state.summary,
    })
  }

  render() {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="number">
            <Col componentClass={ControlLabel} md={2}>
              Scene Number
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="scene number"
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

SceneForm.defaultProps = {
  scene: {
    number: '',
    summary: ''
  }
}

SceneForm.propTypes = {
  scene: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  act_id: PropTypes.number.isRequired,
}

export default SceneForm