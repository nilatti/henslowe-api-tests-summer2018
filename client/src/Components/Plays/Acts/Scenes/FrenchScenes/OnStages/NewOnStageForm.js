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
import {
  Typeahead
} from 'react-bootstrap-typeahead';

class NewOnStageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: this.props.play.characters,
      description: '',
      nonspeaking: false,
      selectedCharacter: [],
      validated: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangeCharacter = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacter: [e[0]]
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
      character_id: this.state.selectedCharacter[0].id,
      character_name: this.state.selectedCharacter[0].label,
      description: this.state.description,
      french_scene_id: this.props.frenchSceneId,
      nonspeaking: this.state.nonspeaking,
    }, "on_stage")
  }

  render() {
    var characters = this.state.characters.map((character) => ({
      id: character.id,
      label: character.name
    }))
    const {
      validated
    } = this.state
    return (<Col md = {{span: 8, offset: 2}}>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group>
        <Form.Label>
          Character/Role
        </Form.Label>
        <Typeahead
          allowNew
          id="character"
          required
          options={characters}
          onChange={(selected) => {
            this.handleChangeCharacter(selected)
          }}
          selected={this.state.selectedCharacter}
          placeholder="Choose character or role"
        />
        <Form.Control.Feedback type="invalid">
            Character/Role is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Description
        </Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        >
        </Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary" block>Submit</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
    </Form> <hr />
    </Col>)
  }
}

NewOnStageForm.propTypes = {
  characters: PropTypes.array.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}


export default NewOnStageForm
