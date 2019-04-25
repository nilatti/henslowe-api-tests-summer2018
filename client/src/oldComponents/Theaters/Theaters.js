import {
  createTheater,
  deleteTheater,
  getTheaters,
  updateServerTheater
} from '../../api/theaters'
import React, {
  Component
} from 'react'
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  withRouter
} from 'react-router-dom'

import TheaterFormToggle from './TheaterFormToggle'
import EditableTheatersList from './EditableTheatersList'

class Theaters extends Component {

  state = {
    theaters: [],
    errorStatus: ''
  }

  addNewTheater = (newTheater) => {
    this.setState({
      theaters: [...this.state.theaters, newTheater]
    })
  }

  componentDidMount() {
    this.loadTheatersFromServer() //loads theaters and sets state theaters array
  }

  async createTheater(theater) {
    const response = await createTheater(theater)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating theater'
      })
    } else {
      this.addNewTheater(response.data)
    }
  }

  async deleteTheater(theaterId) {
    const response = await deleteTheater(theaterId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting theater'
      })
    } else {
      this.setState({
        theaters: this.state.theaters.filter(theater =>
          theater.id != theaterId
        )
      })
    }
  }

  async loadTheatersFromServer() {
    const response = await getTheaters()
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

  async updateTheaterOnServer(theater) {
    const response = await updateServerTheater(theater)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating theater'
      })
    } else {
      this.updateTheater(response.data)
    }
  }

  handleCreateFormSubmit = (theater) => {
    this.createTheater(theater)
  }
  handleDeleteClick = (theaterId) => {
    this.deleteTheater(theaterId)
  }

  handleEditFormSubmit = (theater) => {
    this.updateTheaterOnServer(theater)
    this.updateTheater(theater)
  }

  updateTheater = (theater) => {
    let newTheaters = this.state.theaters.filter((a) => a.id !== theater.id)
    newTheaters.push(theater)
    this.setState({
      theaters: newTheaters
    })
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="theaters">
            <h2>Theaters</h2>
            <EditableTheatersList
              theaters={this.state.theaters}
              onFormSubmit={this.handleEditFormSubmit}
              onDeleteClick={this.handleDeleteClick}
            />
            <TheaterFormToggle
              onFormSubmit={this.handleCreateFormSubmit}
              isOpen={false}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default Theaters