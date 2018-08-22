import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { getAuthors } from '../../api/authors'

class PlayForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      title: this.props.title || '',
      genre: this.props.genre || '',
      author_id: this.props.author_id || {},
      authors: null,
    }
  }

  componentDidMount = () => {
    this.loadAuthorsFromServer()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.authors === null) {
      this.loadAuthorsFromServer()
    }
  }

  generateAuthorSelectItems = () => {
    let authors = this.state.authors
    let items = []
    authors.forEach(function(author){
      var item = {}
      item['value'] = author.id
      item['label'] = author.first_name + " " + author.last_name
      items.push(item)
    })
    return items
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDateChange = (date) => {
    this.setState({
     date: date,
   })
  }

  handleSelectChange = (authorId) => {
    this.setState({ author_id: authorId.value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      author_id: this.state.author_id,
      title: this.state.title,
    })
  }

  async loadAuthorsFromServer () {
    const response = await getAuthors()
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching authors' })
    } else {
      this.setState({ authors: response.data })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        authors: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }


  render () {
    console.log("now I'm rendering the play form")
    if (this.state.authors === null) {
      return (
        <div>Loading!</div>
      )
    }
    const authors = this.generateAuthorSelectItems()
    console.log("the current author is ", this.state.author_id)
    return (
      <Col md={12}>
        <Form horizontal>
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} md={2}>
              Title
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="title"
                name="title" value={this.state.title} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <Select
            name="author_id"
            value={this.state.author_id}
            onChange={this.handleSelectChange}
            options={authors}
      />
          <FormGroup controlId="genre">
            <Col componentClass={ControlLabel} md={2}>
              Genre
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                placeholder="genre"
                name="genre" value={this.state.genre} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel}  md={2}>
              Publication or first performance date
            </Col>
            <Col md={5}>
              <DatePicker
                name="date"
                selected={this.state.date}
                onChange={this.handleDateChange}
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

PlayForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default PlayForm
