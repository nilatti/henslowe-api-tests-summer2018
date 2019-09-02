import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import FrenchSceneForm from './FrenchSceneForm'
import FrenchSceneShow from './FrenchSceneShow'

import {
  updateServerOnStage
} from '../../../../../api/on_stages'

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

  async updateServerOnStage(onStageAttrs) {
    const response = await updateServerOnStage(onStageAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating French scene'
      })
    } else {
      this.setState(state => {
        const onStagesList = this.state.on_stages.map((on_stage) => {
          if (on_stage.id === onStageAttrs.id) {
            return onStageAttrs
          } else {
            return on_stage
          }
        })
        return {
          on_stages: onStagesList
        }
      })
    }
  }


  render() {
    if (this.state.editFormOpen) {
      return (
        <FrenchSceneForm
          actId={this.props.actId}
          frenchScene={this.props.french_scene}
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
  handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
  handleOnStageDeleteClick: PropTypes.func.isRequired,
  handleOnStageEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
  sceneNumber: PropTypes.number.isRequired,
}

export default FrenchSceneInfoTab
