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
    on_stages: this.props.french_scene.on_stages
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.actId, this.props.sceneId, this.props.french_scene.id)
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  handleOnStageEditSubmit = (onStage) => {
    this.updateServerOnStage(onStage)
  }
  handleSubmit = (actId, sceneId, frenchScene) => {
    this.props.handleEditSubmit(actId, sceneId, frenchScene)
    this.closeForm()
  }
  openForm = () => {
    this.setState({
      editFormOpen: true
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
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          playId={this.props.play.id}
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
          handleNonspeakingClick={this.handleOnStageEditSubmit}
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
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
  sceneNumber: PropTypes.number.isRequired,
}

export default FrenchSceneInfoTab
