import axios from 'axios'
import moment from 'moment'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class PlayForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      title: this.props.title || '',
      genre: this.props.genre || '',
      author_id: this.props.author_id || {},
      authors: [],
    }
  }

  componentDidMount = () => {
    this.loadAuthorsFromServer()
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
    if (authorId) {
      console.log(`Selected: ${authorId.value}`);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      author_id: this.props.author_id,
      title: this.state.title,
    })
  }

  loadAuthorsFromServer = () => {
    axios.get('/api/authors.json')
    .then(response => {
      this.setState({ authors: response.data })
    })
    .catch(error => console.log(error))
  }

  render () {
    const authors = this.state.authors.reduce(function(map, author) {
      map["value: " + author.id] = "label: " + author.first_name + " " + author.last_name
      return map
    }, {})
    console.log(authors)
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
            options={[
              {authors}
            ]}
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
  author_id: PropTypes.number.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default PlayForm
