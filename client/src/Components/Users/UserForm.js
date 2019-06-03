import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

import AddressForm from '../AddressForm'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.user.email || '',
      first_name: this.props.user.first_name || '',
      password: this.props.password || '',
      password_confirmation: '',
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
      email: this.state.email,
      first_name: this.state.first_name,
      id: this.props.user.id,
      password: this.state.password,
    }, "user")
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md = {
        {
          span: 8,
          offset: 2
        }
      } >
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group controlId="first_name">
        <Form.Label>
          First Name
        </Form.Label>
        <Form.Control
            name="first_name"
            onChange={this.handleChange}
            placeholder="First Name"
            required
            type="first_name"
            value={this.state.first_name}
          />
          <Form.Control.Feedback type="invalid">
            First Name is required
          </Form.Control.Feedback>
      </Form.Group>
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
            <Button type="submit" variant="primary" block>Submit</Button>
            <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form>
        <hr />
      </Col>
    )
  }
}

UserForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default UserForm
