import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import OnStageForm from './OnStageForm'
import OnStageShow from './OnStageShow'

class EditableOnStage extends Component {
  state = {
    editFormOpen: false,
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

  handleSubmit = (onStage) => {
    this.props.handleEditSubmit(onStage)
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
        <OnStageForm
          french_scene_id={this.props.french_scene_id}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          on_stage={this.props.on_stage}
        />
      )
    }
    return (
      <div>
        <OnStageShow
          changeNonspeaking={this.props.changeNonspeaking}
          french_scene_id={this.props.french_scene_id}
          handleEditClick={this.handleEditClick}
          on_stage={this.props.on_stage}
        />
      </div>
    )
  }
}

EditableOnStage.propTypes = {
  changeNonspeaking: PropTypes.func.isRequired,
  french_scene_id: PropTypes.number.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  on_stage: PropTypes.object.isRequired,
}

export default EditableOnStage