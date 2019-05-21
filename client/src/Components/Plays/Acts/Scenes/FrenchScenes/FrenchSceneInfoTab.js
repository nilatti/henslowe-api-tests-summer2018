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
    this.props.onDeleteClick(this.props.french_scene.id)
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
  handleSubmit = (frenchScene) => {
    this.props.handleEditSubmit(frenchScene)
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
          french_scene={this.props.french_scene}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play_id={this.props.play_id}
          scene_id={this.props.scene_id}
        />
      )
    }
    return (
      <div>
        <FrenchSceneShow
          act_number={this.props.act_number}
          french_scene={this.props.french_scene}
          handleEditClick={this.handleEditClick}
          handleNonspeakingClick={this.handleOnStageEditSubmit}
          onDeleteClick={this.handleDeleteClick}
          play_id={this.props.play_id}
          scene_number={this.props.scene_number}
        />
      </div>
    )
  }
}

FrenchSceneInfoTab.propTypes = {
  act_number: PropTypes.number.isRequired,
  french_scene: PropTypes.object.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
  scene_id: PropTypes.number.isRequired,
  scene_number: PropTypes.number.isRequired,
}

export default FrenchSceneInfoTab