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
import Moment from 'react-moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
moment.locale('en')
momentLocalizer()
const validate = ({ startTime, endTime }) => {
  return {
    endTime:
      endTime < startTime
        ? "Start time must be after end time."
        : false
  };
};

class RehearsalForm extends Component {
  constructor(props) {
    super(props)
    let endTime = ''
    let notes = ''
    let startTime = ''
    let title = ''
    if (this.props.rehearsal) {
      endTime =  this.props.rehearsal.end_time
      notes = this.props.rehearsal.notes
      startTime = this.props.rehearsal.start_time
      title = this.props.rehearsal.title
    }
    this.state = {
      endTime: endTime,
      notes: notes,
      startTime: startTime,
      textUnit: '',
      title: title
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
      endTime: moment(event).format()
    })
  }

  handleStartTimeChange = (event) => {
    this.setState({
      startTime: moment(event).format()
    })
  }

  handleTextUnitChange = (event) => {
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
      this.props.onFormClose()
    }
    this.setState({
      validated: true
    })
  }

  // loadTextUnits TKTKTK

  processSubmit = () => {
    let id
    if (this.props.rehearsal) {
      id = this.props.rehearsal.id
    }
    this.props.onFormSubmit({
      id: id,
      end_time: this.state.endTime,
      notes: this.state.notes,
      space_id: '',
      start_time: this.state.startTime,
      title: this.state.title,
      production_id: this.props.productionId,
    }, "rehearsal")
  }

  render() {
    let startTime
    if (this.state.startTime) {
      startTime = new Date(this.state.startTime)
    } else {
      startTime = new Date()
    }
    let endTime
    if (this.state.endTime) {
      endTime = new Date(this.state.endTime)
    } else {
      endTime = new Date()
    }
    const {
      validated
    } = this.state
    return (
      <Col md={ {
          span: 8,
          offset: 2
        } }>
      <h2>How do you want to schedule this rehearsal?</h2>
      <Form
        onSubmit={e => this.loadTextUnits(e)}
      >
      <Form.Group as={Form.Row}>
        <Form.Label as="legend">
          Unit of text
        </Form.Label>
        <Col sm={10} className="form-radio">
          <Form.Check
            checked={this.state.textUnit === 'french_scene'}
            id="french_scene"
            label="French Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="french_scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'scene'}
            id="scene"
            label="Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'act'}
            id="act"
            label="Act"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="act"
          />
          <Form.Check
            checked={this.state.textUnit === 'play'}
            id="play"
            label="Whole Play"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="play"
          />
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" block>Load Text Options</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
      </Form>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group controlId="start_time">
        <Form.Label>
          Start Time
        </Form.Label>
        <DateTimePicker
          format={"MM/DD/YYYY hh:mm A"}
          onChange={this.handleStartTimeChange}
          value={startTime}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>
          End Time
        </Form.Label>
        <DateTimePicker
          defaultValue={startTime}
          format={"MM/DD/YYYY hh:mm A"}
          min={startTime}
          onChange={this.handleEndTimeChange}
          value={endTime}
        />
        <Form.Control.Feedback type="invalid">
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="notes">
        <Form.Label>Notes:</Form.Label>
        <Form.Control
          as="textarea"
          name="notes"
          onChange={this.handleChange}
          rows="3"
          value={this.state.notes}
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

RehearsalForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.string.isRequired,
}

export default RehearsalForm
