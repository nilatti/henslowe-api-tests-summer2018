import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon } from 'react-bootstrap'

class AuthorFormToggle extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true })
  }

  handleFormClose = () => {
    this.setState({ isOpen: false })
  }

  handleFormSubmit = (author) => {
    this.handleFormClose()
    this.props.onFormSubmit(author)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <AuthorForm
          id={this.props.id}
          first_name={this.props.first_name}
          middle_name={this.props.middle_name}
          last_name={this.props.last_name}
          birthdate={this.props.birthdate}
          deathdate={this.props.deathdate}
          nationality={this.props.nationality}
          gender={this.props.gender}
          plays={this.props.plays}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div>
          <button
            onClick={this.handleFormOpen}
          >
            <Glyphicon glyph='glyphicon glyphicon-plus' />
          </button>
        </div>
      );
    }
  }
}

class AuthorForm extends Component {
  constructor (props) {
    super (props)
    console.log('props', this.props)
    this.state = {
      first_name: this.props.first_name || '',
      middle_name: this.props.middle_name || '',
      last_name: this.props.last_name || '',
      birthdate: this.props.birthdate || '',
      deathdate: this.props.deathdate || '',
      nationality: this.props.nationality || '',
      gender: this.props.gender || '',
      plays: this.props.plays
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {

    event.preventDefault()
    console.log("running handle submit", arguments)
    this.props.onFormSubmit({
      id: this.props.id,
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      birthdate: this.state.birthdate,
      deathdate: this.state.deathdate,
      nationality: this.state.nationality,
      gender: this.state.gender,
      plays: this.state.plays
    })
  }

  render () {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="formHorizontalFirstName">
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="first name" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default AuthorFormToggle
