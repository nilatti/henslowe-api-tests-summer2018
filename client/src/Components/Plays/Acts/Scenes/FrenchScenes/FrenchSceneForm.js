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

class FrenchSceneForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: this.props.french_scene.number,
      scene_id: this.props.scene_id,
      summary: this.props.french_scene.summary,
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
      id: this.props.french_scene.id,
      scene_id: this.state.scene_id,
      summary: this.state.summary,
    })
  }

  render() {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="number">
            <Col componentClass={ControlLabel} md={2}>
              French Scene Number (letter)
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="french scene number"
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

FrenchSceneForm.defaultProps = {
  french_scene: {
    number: '',
    summary: ''
  }
}

FrenchSceneForm.propTypes = {
  french_scene: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  scene_id: PropTypes.number.isRequired,
}

export default FrenchSceneForm