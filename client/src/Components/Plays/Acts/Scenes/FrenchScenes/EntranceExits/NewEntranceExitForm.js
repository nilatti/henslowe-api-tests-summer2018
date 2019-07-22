import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Button,
  Col,
  Form,
  Row
} from 'react-bootstrap'

class NewEntranceExitForm extends Component {
  state={
    validated: false,
    name: '',
  }

  handleSubmit = (entranceExit) => {
    this.props.onFormClose()
    this.props.onFormSubmit(entranceExit)
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
      name: this.state.name,
      frenchScene_id: this.props.frenchSceneId
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
      <div>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      
        <Button type="submit" variant="primary" block>Submit</Button>
        <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
      </Form>
      </div>
    )
  }
}

NewEntranceExitForm.propTypes = {
  frenchSceneId: PropTypes.number.isRequired,
  // onFormClose: PropTypes.func.isRequired,
  // onFormSubmit: PropTypes.func.isRequired,
}


export default NewEntranceExitForm
