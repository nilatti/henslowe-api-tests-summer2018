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
  FormGroup
} from 'react-bootstrap'
import {
  Typeahead
} from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {
  getAuthors
} from '../../api/authors'

class PlayForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author_id: this.props.author_id || {},
      authors: null,
      genre: this.props.genre || '',
      title: this.props.title || '',
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAuthorChange = (author) => {
    this.setState({
      author_id: author[0].id
    })
  }

  handleDateChange = (date) => {
    this.setState({
      date: date
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFormSubmit({
      author_id: this.state.author_id,
      date: this.state.date,
      genre: this.state.genre,
      title: this.state.title,
    })
  }

  async loadAuthorsFromServer() {
    const response = await getAuthors()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching authors'
      })
    } else {
      this.setState({
        authors: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        authors: null,
        prevId: props.id
      };
    }
    // No state update necessary
    return null;
  }

  render() {
    if (!this.state.authors) {
      return <div>Loading</div>
    }
    var selected = {
      label: "Arthur Miller",
      id: 21,
    }
    var authors = this.state.authors.map((author) => ({
      label: `${author.first_name} ${author.last_name}`,
      id: author.id
    }))
    return (
      <Col md={12} >
          <Form horizontal>
				    <FormGroup controlId="title">
      				<Col componentClass={ControlLabel} md={2}>
                Title
              </Col>
              <Col md={5}>
      				    <FormControl
                    type="text"
      				      placeholder="title"
      				      name="title"
      				      value={this.state.title}
      				      onChange={this.handleChange}
      				    />
              </Col>
            </FormGroup>
            { !this.props.isOnAuthorPage
              ?
              <FormGroup>
                <ControlLabel>
  								Author:
  							</ControlLabel>
  							<Typeahead
                  id="author"
                  onChange={(selected) => {
                    this.setState({author_id: selected})
                  }}
                  options={authors}
  							/>
  						</FormGroup>
              :
              <br/>
            }

						<FormGroup controlId="genre">
							<Col componentClass={ControlLabel} md={2}>
								Genre
							</Col>
							<Col md={5}>
								<FormControl
									type="text"
									placeholder="genre"
									name="genre"
									value={this.state.genre}
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel}
								md={2}>
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
						<Button
							type="submit"
							bsStyle="primary"
							onClick={this.handleSubmit}
						>
							Submit
						</Button>
						<Button
							type="button"
							onClick={this.props.onFormClose}
						>
							Cancel
						</Button>
					</Form>
					<hr />
				</Col>
    )
  }
}

PlayForm.propTypes = {
  isOnAuthorPage: PropTypes.bool.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
}

export default PlayForm