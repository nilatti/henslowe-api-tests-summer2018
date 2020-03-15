import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import RehearsalForm from './RehearsalForm'
import RehearsalShow from './RehearsalShow'

class EditableRehearsal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      rehearsal: null,
    }
  }

  handleEditClick = () => {
    this.toggleForm()
  }

  handleSubmit = (rehearsal) => {
    this.props.handleSubmit(rehearsal)
    this.toggleForm()
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
    if (this.props.rehearsal === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <RehearsalForm
          rehearsal={this.props.rehearsal}
          isOpen={true}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.toggleForm}
          production={this.props.production}
        />
      )
    } else {
      return (
        <RehearsalShow
        rehearsal={this.props.rehearsal}
        handleEditClick={this.handleEditClick}
        handleDeleteClick={this.props.handleDeleteClick}
        onFormSubmit={this.handleSubmit}
        />
      )
    }
  }
}

EditableRehearsal.propTypes = {
  rehearsal: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  production: PropTypes.object.isRequired,
}

export default EditableRehearsal
