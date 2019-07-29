import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import ActForm from './ActForm'
import ActShow from './ActShow'

class ActInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false
    })
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.act.id)
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  handleSubmit = (act) => {
    this.props.handleEditSubmit(act)
    this.closeForm()
  }
  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }


  render() {
    if (this.state.editFormOpen) {
      return (
        <ActForm
          act={this.props.act}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play={this.props.play} 
        />
      )
    }
    return (
      <div>
        <ActShow
          act={this.props.act}
          handleDeleteClick={this.handleDeleteClick}
          handleEditClick={this.handleEditClick}
          play={this.props.play}
        />
      </div>
    )
  }
}

ActInfoTab.propTypes = {
  act: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default ActInfoTab
