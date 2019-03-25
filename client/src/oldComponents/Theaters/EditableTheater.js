import PropTypes from 'prop-types';
import React, { Component } from 'react'

import { getTheater } from '../../api/theaters'

import TheaterForm from './TheaterForm'
import TheaterShow from './TheaterShow'

class EditableTheater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      theater: null,
    }
  }
  closeForm = () => {
    this.setState({ editFormOpen: false })
  }
  componentDidMount = () => {
    this.loadTheaterFromServer(this.props.match.params.theaterId)
  }
  componentDidUpdate(prevProps) {
    if (this.state.theater === null || prevProps.match.params.theaterId !== this.props.match.params.theaterId) {
      this.loadTheaterFromServer(this.props.match.params.theaterId);
    }
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  handleSubmit = (theater) => {
    this.props.onFormSubmit(theater)
    this.closeForm()
  }
  async loadTheaterFromServer (theaterId) {
    const response = await getTheater(theaterId)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching theater' })
    } else {
      this.setState({ theater: response.data })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        theater: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  render () {
    if (this.state.theater === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <TheaterForm
          city={this.state.theater.city}
          key={this.state.theater.id}
          id={this.state.theater.id}
          mission_statement={this.state.theater.mission_statement}
          name={this.state.theater.name}
          phone_number={this.state.theater.phone_number}
          state={this.state.theater.state}
          street_address={this.state.theater.street_address}
          website={this.state.theater.website}
          zip={this.state.theater.zip}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return(
        <TheaterShow
        city={this.state.theater.city}
        key={this.state.theater.id}
        id={this.state.theater.id}
        mission_statement={this.state.theater.mission_statement}
        name={this.state.theater.name}
        phone_number={this.state.theater.phone_number}
        state={this.state.theater.state}
        street_address={this.state.theater.street_address}
        website={this.state.theater.website}
        zip={this.state.theater.zip}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        />
      )
    }
  }
}

EditableTheater.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default EditableTheater
