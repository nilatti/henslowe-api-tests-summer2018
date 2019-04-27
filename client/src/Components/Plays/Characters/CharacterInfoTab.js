import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'

import CharacterForm from './CharacterForm'
import CharacterShow from './CharacterShow'

class CharacterInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false
    })
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.character.id)
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  handleSubmit = (character) => {
    this.props.handleEditSubmit(character)
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
        <CharacterForm character={this.props.character} play_id={this.props.play_id} onFormClose={this.handleFormClose} onFormSubmit={this.handleSubmit} />
      )
    }
    return (
      <div>
        <CharacterShow character={this.props.character} handleEditClick={this.handleEditClick} handleDeleteClick={this.handleDeleteClick}/>
        </div>
    )
  }
}

CharacterInfoTab.propTypes = {
  character: PropTypes.object.isRequired,
  play_id: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default CharacterInfoTab