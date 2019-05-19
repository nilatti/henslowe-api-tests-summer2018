import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class FrenchSceneForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      end_page: this.props.french_scene.end_page,
      number: this.props.french_scene.number,
      scene_id: this.props.scene_id,
      start_page: this.props.french_scene.start_page,
      summary: this.props.french_scene.summary,
      validated: false,
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
      end_page: this.state.end_page,
      id: this.props.french_scene.id,
      number: this.state.number,
      scene_id: this.state.scene_id,
      start_page: this.state.start_page,
      summary: this.state.summary,
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

          <Form.Row>
            <Col>
            <Form.Group controlId="number">
              <Form.Label>
                French Scene Number (letter)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="french scene number"
                name="number"
                onChange={this.handleChange}
                pattern="[a-z]+"
                required
                value={this.state.number}
              />
              <Form.Control.Feedback type="invalid">
                French scene "number" is required, and must be lowercase letters (sorry).
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="start_page">
                  <Form.Label>
                    Start Page
                  </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="starting page number"
                      name="start_page"
                      onChange={this.handleChange}
                      pattern="[0-9]+"
                      value={this.state.start_page}
                    />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="end_page">
                  <Form.Label>
                    End Page
                  </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="ending page number"
                      name="end_page"
                      onChange={this.handleChange}
                      pattern="[0-9]+"
                      value={this.state.end_page}
                    />
                </Form.Group>
              </Col>
          </Form.Row>
          <Form.Group controlId="summary">
            <Form.Label>
              Summary
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              placeholder="summary"
              name="summary"
              value={this.state.summary}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary" block>Submit</Button>
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