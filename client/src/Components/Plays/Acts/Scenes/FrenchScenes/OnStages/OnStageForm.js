import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class OnStageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      french_scene_id: this.props.french_scene_id,
      category: this.props.on_stage.category,
      description: this.props.on_stage.description,
      id: this.props.on_stage.id,
      nonspeaking: this.props.on_stage.nonspeaking,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit()
    }
    this.setState({
      validated: true
    })
  }

  processSubmit = () => {
    this.props.onFormSubmit({
      category: this.state.category,
      description: this.state.description,
      id: this.props.on_stage.id,
      nonspeaking: this.state.nonspeaking,
    })
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          noValidate
          onSubmit={e => this.handleSubmit(e)}
          validated={validated}
        >


            <Col>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  onChange={this.handleChange}
                  value={this.state.category || ''}
                >
                  <option>Character</option>
                  <option>Music</option>
                  <option>Movement</option>
                  <option>Other...</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="description">
                  <Form.Label>
                    Description
                  </Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder="description"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description || ''}
                    />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="nonspeaking">
                  <Form.Label>
                    Nonspeaking?
                  </Form.Label>
                    <Form.Control
                      type="checkbox"
                      name="nonspeaking"
                      onChange={this.handleChange}
                      value={this.state.nonspeaking}
                    />
                </Form.Group>
              </Col>
          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form>
        <hr />
      </Col>
    )
  }
}

OnStageForm.propTypes = {
  french_scene_id: PropTypes.number.isRequired,
  on_stage: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default OnStageForm