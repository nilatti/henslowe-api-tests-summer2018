import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getTheater,
  updateServerTheater
} from '../../api/theaters'

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
    this.setState({
      editFormOpen: false,
    })
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
    this.updateTheaterOnServer(theater)
    this.closeForm()
  }

  async loadTheaterFromServer(theaterId) {
    const response = await getTheater(theaterId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching theater'
      })
    } else {
      this.setState({
        theater: response.data
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
      this.setState({
        theater: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        Theater: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }

  render() {
    if (this.state.theater === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <TheaterForm
          theater={this.state.theater}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <TheaterShow
        theater={this.state.theater}
        onEditClick={this.handleEditClick}
        onDeleteClick={this.props.onDeleteClick}
        onFormSubmit={this.handleSubmit}
        />
      )
    }
  }
}

EditableTheater.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableTheater