import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import ConflictForm from './ConflictForm'
import ConflictShow from './ConflictShow'

class EditableConflict extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      conflict: null,
    }
  }

  handleEditClick = () => {
    this.toggleForm()
  }
  handleSubmit = (user) => {
    console.log('handle submit called in editable conflict')
    this.toggleForm()
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
    if (this.props.conflict === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <ConflictForm
          conflict={this.props.conflict}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <ConflictShow
        conflict={this.props.conflict}
        handleEditClick={this.handleEditClick}
        handleDeleteClick={this.props.onDeleteClick}
        onFormSubmit={this.handleSubmit}
        />
      )
    }
  }
}

EditableConflict.propTypes = {
  conflict: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default EditableConflict
