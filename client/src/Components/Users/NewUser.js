import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

class NewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
    }
  }

  handleFormClose = () => {
    this.setState({
      isOpen: false
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
    this.handleFormClose()
    this.props.onFormSubmit({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

render() {
    const {
      validated
    } = this.state
    return (
      <Row>
        <Col md={12} >
          <div id="new-user-form">
          <Col md={{
              span: 8,
              offset: 2
            }}>
          <Form
            noValidate
            onSubmit={e => this.handleSubmit(e)}
            validated={validated}
          >
          <Form.Group controlId="email">
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control
                name="email"
                onChange={this.handleChange}
                placeholder="email"
                required
                type="email"
                value={this.state.email}
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              Password
            </Form.Label>
              <Form.Control
                name="password"
                onChange={this.handleChange}
                placeholder="password"
                type="password"
                value={this.state.password}
              />
          </Form.Group>
          <Form.Group controlId="password_confirmation">
            <Form.Label>
              Confirm Password
            </Form.Label>
              <Form.Control
                name="password_confirmation"
                onChange={this.handleChange}
                placeholder="confirm password"
                type="password"
                value={this.state.password_confirmation}
              />
              <Form.Control.Feedback type="invalid">
                Passwords must match and are required
              </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
          </Form>
          </Col>
          </div>
        </Col>
      </Row>
    )
  }
}

NewUser.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewUser
