import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import FrenchSceneForm from './FrenchSceneForm'
import FrenchSceneShow from './FrenchSceneShow'

class FrenchSceneInfoTab extends Component {
  state = {
    editFormOpen: false,
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.actId, this.props.sceneId, this.props.french_scene.id)
  }
  handleEditClick = () => {
    this.toggleForm()
  }
  handleFormClose = () => {
    this.toggleForm()
  }
  handleSubmit = (frenchScene) => {
    this.props.handleEditSubmit(this.props.actId, this.props.sceneId, frenchScene)
    this.toggleForm()
  }
  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
    if (this.state.editFormOpen) {
      return (
        <FrenchSceneForm
          actId={this.props.actId}
          frenchScene={this.props.french_scene}
          handleEntranceExitCreateFormSubmit={this.onEntranceExitCreateFormSubmit}
          handleEntranceExitDeleteClick={this.onEntranceExitDeleteClick}
          handleEntranceExitEditFormSubmit={this.onEntranceExitEditFormSubmit}
          handleOnStageCreateFormSubmit={this.onOnStageCreateFormSubmit}
          handleOnStageDeleteClick={this.onOnStageDeleteClick}
          handleOnStageEditFormSubmit={this.onOnStageEditFormSubmit}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play={this.props.play}
          sceneId={this.props.sceneId}
        />
      )
    }
    return (
      <div>
        <FrenchSceneShow
          actId={this.props.actId}
          actNumber={this.props.actNumber}
          frenchScene={this.props.french_scene}
          handleEditClick={this.handleEditClick}
          handleEditSubmit={this.props.handleEditSubmit}
          handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
          handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
          handleEntranceExitDeleteClick={this.props.handleEntranceExitDeleteClick}
          handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
          handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
          handleOnStageDeleteClick={this.props.handleOnStageDeleteClick}
          onDeleteClick={this.handleDeleteClick}
          play={this.props.play}
          sceneId={this.props.sceneId}
          sceneNumber={this.props.sceneNumber}
        />
      </div>
    )
  }
}

FrenchSceneInfoTab.propTypes = {
  actId: PropTypes.number.isRequired,
  actNumber: PropTypes.number.isRequired,
  french_scene: PropTypes.object.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitDeleteClick: PropTypes.func.isRequired,
  handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
  handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
  handleOnStageDeleteClick: PropTypes.func.isRequired,
  handleOnStageEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
  sceneNumber: PropTypes.number.isRequired,
}

export default FrenchSceneInfoTab
