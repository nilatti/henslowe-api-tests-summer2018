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
        <ActForm act={this.props.act} play_id={this.props.play_id} onFormClose={this.handleFormClose} onFormSubmit={this.handleSubmit} />
      )
    }
    return (
      <div>
        <ActShow act={this.props.act} handleEditClick={this.handleEditClick} handleDeleteClick={this.handleDeleteClick}/>
      </div>
    )
  }
}

ActInfoTab.propTypes = {
  act: PropTypes.object.isRequired,
  play_id: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default ActInfoTab