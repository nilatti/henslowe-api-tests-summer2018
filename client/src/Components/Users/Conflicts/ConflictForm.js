import moment from 'moment'
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
var Datetime = require('react-datetime')

class ConflictForm extends Component {
  constructor(props) {
    super(props)
    let category = ''
    let endTime = ''
    let startTime = ''
    if (this.props.conflict) {
      category =  this.props.conflict.category
      endTime =  this.props.conflict.end_time
      startTime = this.props.conflict.start_time
    }
    this.state = {
      category: category,
      endTime: endTime,
      startTime: startTime,

    }
  }

  handleChange = (event) => {
    console.log(event.target)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEndTimeChange = (event) => {
    this.setState({
      endTime: moment().format()
    })
  }

  handleStartTimeChange = (event) => {
    this.setState({
      startTime: moment().format()
    })
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit()
      this.props.onFormClose()
    }
    this.setState({
      validated: true
    })
  }

  processSubmit = () => {
    console.log('process submit called')
    this.props.onFormSubmit({
      category: this.state.category,
      end_time: this.state.endTime,
      space_id: '',
      start_time: this.state.startTime,
      user_id: this.props.user.id,
    }, "conflict")
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md={ {
          span: 8,
          offset: 2
        } }>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group controlId="start_time">
        <Form.Label>
          Start Time
        </Form.Label>
        <Datetime
          name="start_time"
          onChange={this.handleStartTimeChange}
          value={this.state.start_time}
        />
          <Form.Control.Feedback type="invalid">
            Start time is required
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>
          End Time
        </Form.Label>
        <Datetime
          name="end_time"
          onChange={this.handleEndTimeChange}
          value={this.state.end_time}
        />
        <Form.Control.Feedback type="invalid">
          End time is required
        </Form.Control.Feedback>
      </Form.Group>
        <fieldset>
    <Form.Group as={Form.Row}>
      <Form.Label as="legend">
        Category
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          name="category"
          id="rehearsal"
          label="Rehearsal"
          onChange={this.handleChange}
          type="radio"
        />
        <Form.Check
          id="work"
          label="Work"
          name="category"
          onChange={this.handleChange}
          type="radio"
        />
        <Form.Check
          id="class"
          label="Class"
          name="category"
          onChange={this.handleChange}
          type="radio"
        />
        <Form.Check
          id="personal"
          label="Personal"
          name="category"
          onChange={this.handleChange}
          type="radio"
        />
      </Col>
    </Form.Group>
  </fieldset>
          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
      </Form>
        <hr />
      </Col>
    )
  }
}

ConflictForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ConflictForm
