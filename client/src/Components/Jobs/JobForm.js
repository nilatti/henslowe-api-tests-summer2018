import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'
import {
  Typeahead
} from 'react-bootstrap-typeahead';

import {
  getSpecializations
} from '../../api/specializations'

import {
  getProductions,
  getProductionsForTheater
} from '../../api/productions'

import {
  getTheaterNames
} from '../../api/theaters'

import {
  getUsers
}  from '../../api/users'



class JobForm extends Component {
  constructor(props) {
    super(props)
    let end_date
    let production
    let start_date
    let theater
    let theaterSet
    let user
    let userName
    let userSet
    if (this.props.job) {
      end_date = this.props.job.end_date
      production = this.props.job.production
      start_date = this.props.job.start_date
      theater = this.props.job.theater
      user = this.props.job.user
    }

    if (this.props.production) {
      end_date = this.props.production.end_date
      production = this.props.production
      start_date = this.props.production.start_date
      theater = this.props.production.theater
    }

    if (this.props.theater) {
      theater = this.props.theater
      theaterSet = true
    }

    if (this.props.user) {
      user = this.props.user
      userSet = true
      userName = this.buildUserName(user)
    }

    this.state = {
      end_date: end_date || '',
      productions: [],
      productionSet: this.props.productionSet,
      selectedProduction: production ? [{id: production.id, label: `${production.play.title} at ${theater.name}` }] : [],
      selectedSpecialization: this.props.job.specialization ? [{id: this.props.job.specialization.id, label: this.props.job.specialization.title }] : [],
      selectedTheater: theater ? [{id: theater.id, label: theater.name }] : [],
      selectedUser: user ? [{id: user.id, label: userName}] : [],
      specializations: [],
      start_date: start_date || '',
      theaters: [],
      theaterSet: theaterSet,
      users: [],
      userSet: userSet || false,
      validated: false,
    }
  }

  buildUserName = (user) => {
    const userNameFirst = user.preferred_name || user.first_name || user.email
    const userNameLast = user.last_name || user.email
    return `${userNameFirst} ${userNameLast}`
  }

  componentDidMount = () => {
    if (this.props.theater) {
      this.loadProductionsForTheaterFromServer(this.props.theater.id)
    } else {
      this.loadProductionsFromServer()
    }

    this.loadSpecializationsFromServer()
    this.loadTheatersFromServer()
    this.loadUsersFromServer()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangeProduction = (e) => {
    if (e.length > 0) {
      const newProd = this.state.productions.find(production => {
        return production.id === e[0].id
      })
      this.setState({
        end_date: newProd.end_date,
        selectedProduction: [e[0]],
        selectedTheater: [{id: newProd.theater.id, label: newProd.theater.name }],
        start_date: newProd.start_date,
      })
    }
  }

  handleChangeSpecialization = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedSpecialization: [e[0]]
      })
    }
  }

  handleChangeTheater = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedTheater: [e[0]]
      })
    }
  }

  handleChangeUser = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedUser: [e[0]]
      })
    }
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
      end_date: this.state.end_date,
      production_id: this.state.selectedProduction[0].id,
      start_date: this.state.start_date,
      specialization_id: this.state.selectedSpecialization[0].id,
      theater_id: this.state.selectedTheater[0].id,
      user_id: this.state.selectedUser[0].id,
      id: this.props.job.id,
    }, "job")
  }

  async loadProductionsFromServer() {
    const response = await getProductions()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching productions'
      })
    } else {
      this.setState({
        productions: response.data
      })
    }
  }

  async loadProductionsForTheaterFromServer(theaterId) {
    const response = await getProductionsForTheater(theaterId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching productions'
      })
    } else {
      this.setState({
        productions: response.data
      })
    }
  }

  async loadSpecializationsFromServer() {
    const response = await getSpecializations()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching specializations'
      })
    } else {
      this.setState({
        specializations: response.data
      })
    }
  }

  async loadTheatersFromServer() {
    const response = await getTheaterNames()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching theaters'
      })
    } else {
      this.setState({
        theaters: response.data
      })
    }
  }

  async loadUsersFromServer() {
    const response = await getUsers()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching users'
      })
    } else {
      this.setState({
        users: response.data
      })
    }
  }

  render() {
    const {
      validated
    } = this.state
    if (!this.state.productions) {
      return <div>Loading productions</div>
    }
    if (!this.state.specializations) {
      return <div>Loading specializations</div>
    }
    if (!this.state.theaters) {
      return <div>Loading theaters</div>
    }
    if (!this.state.users) {
      return <div>Loading users</div>
    }

    var productions = this.state.productions.map((production) => ({
      id: production.id,
      label: `${production.play.title} at ${production.theater.name}`
    }))

    var specializations = this.state.specializations.map((specialization) => ({
      id: specialization.id,
      label: String(specialization.title)
    }))

    var theaters = this.state.theaters.map((theater) => ({
      id: theater.id,
      label: String(theater.name)
    }))

    var users = this.state.users.map((user) => ({
      id: user.id,
      label: this.buildUserName(user)
    }))
    return (<Col md = {{span: 8, offset: 2}}>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group>
        <Form.Label>
          User
        </Form.Label>
        <Typeahead
          disabled={(this.state.userSet === true || this.state.userSet) ? true : false}
          id="user"
          required
          options={users}
          onChange={(selected) => {
            this.handleChangeUser(selected)
          }}
          selected={this.state.selectedUser}
          placeholder="Choose the user"
        />
        <Form.Control.Feedback type="invalid">
            User is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Specialization
        </Form.Label>
        <Typeahead
          id="specialization"
          required
          options={specializations}
          onChange={(selected) => {
            this.handleChangeSpecialization(selected)
          }}
          selected={this.state.selectedSpecialization}
          placeholder="Choose the specialization"
        />
        <Form.Control.Feedback type="invalid">
            Specialization is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Production
        </Form.Label>
        <Form.Text color="muted">
            When the production is set, the theater will update to match.<br />
            The dates will also update but can be edited to match the duration of the actual job.
        </Form.Text>
        <Typeahead
          id="production"
          options={productions}
          onChange={(selected) => {
            this.handleChangeProduction(selected)
          }}
          selected={this.state.selectedProduction}
          placeholder="Choose the production"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Theater
        </Form.Label>
        <Typeahead
          disabled={(this.state.productionSet === true || this.state.theaterSet) ? true : false}
          id="theater"
          options={theaters}
          onChange={(selected) => {
            this.handleChangeTheater(selected)
          }}
          selected={this.state.selectedTheater}
          placeholder="Choose the theater"
        />
      </Form.Group>
      <Form.Group controlId="start_date">
        <Form.Label>
          Start Date
        </Form.Label>
        <Form.Control
            name="start_date"
            onChange={this.handleChange}
            placeholder=""
            type="date"
            value={this.state.start_date}
          />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>
          End Date
        </Form.Label>
        <Form.Control
          min={this.state.start_date}
            name="end_date"
            onChange={this.handleChange}
            placeholder=""
            type="date"
            value={this.state.end_date}
          />
      </Form.Group>

          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form> <hr />
      </Col>)
  }
}

JobForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  job: PropTypes.object,
}

JobForm.defaultProps = {
  job: {
    city: '',
    id: '',
    mission_statement: '',
    name: '',
    phone_number: '',
    state: '',
    street_address: '',
    website: '',
    zip: '',
  }
}

export default JobForm