import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import OnStageForm from './OnStageForm'
import OnStageShow from './OnStageShow'

class EditableOnStage extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.french_scene.id)
  }

  handleSubmit = (onStage) => {
    this.props.handleEditSubmit(onStage)
    this.closeForm()
  }

  render() {
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
