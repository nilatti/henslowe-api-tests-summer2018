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
  FormGroup,
} from 'react-bootstrap'

class CharacterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      age: this.props.character.age,
      description: this.props.character.description,
      gender: this.props.character.gender,
      name: this.props.character.name,
      play_id: this.props.play_id,
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
      age: this.state.age,
      description: this.state.description,
      gender: this.state.gender,
      id: this.props.character.id,
      name: this.state.name,
      play_id: this.props.play_id,

    })
  }

  render() {
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} md={2}>
              Name
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="name"
                name="name" value={this.state.name} onChange={this.handleChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="gender">
            <Col componentClass={ControlLabel} md={2}>
              Gender
            </Col>
            <Col md={5}>
              <FormControl
                as="select"
                componentClass="select"
                name="gender"
                onChange={this.handleChange}
                value={this.state.gender}
              >
                <option></option>
                <option>Female</option>
                <option>Male</option>
                <option>Neutral</option>
                <option>Nonbinary/other</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="age">
            <Col componentClass={ControlLabel} md={2}>
              Age
            </Col>
            <Col md={5}>
              <FormControl
                as="select"
                componentClass="select"
                name="age"
                onChange={this.handleChange}
                value={this.state.age}
              >
                <option></option>
                <option>Baby</option>
                <option>Child</option>
                <option>Teenager</option>
                <option>Young Adult</option>
                <option>Adult</option>
                <option>Senior</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="description">
            <Col componentClass={ControlLabel} md={2}>
              Description
            </Col>
            <Col md={5}>
              <FormControl
                componentClass="textarea"
                rows="10"
                placeholder="description"
                name="description" value={this.state.description} onChange={this.handleChange}
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

CharacterForm.defaultProps = {
  character: {
    age: '',
    description: '',
    gender: '',
    name: '',
  }
}

CharacterForm.propTypes = {
  character: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default CharacterForm