import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'


import { RIEInput, RIEToggle} from '@attently/riek'

class OnStageShow extends Component {
  state = {
    description: this.props.onStage.description,
    nonspeaking: this.props.onStage.nonspeaking,
  }

  handleEditClick(selected, onStageId) {
    let workingOnStage = {
      description: this.state.description,
      id: this.props.onStage.id,
      nonspeaking: this.state.nonspeaking,
    }
    // let workingOnStage = {...this.props.onStage, ...selected}
    console.log('working onstage is', workingOnStage)
    this.props.onEdit(this.props.actId, this.props.sceneId, this.props.frenchSceneId, workingOnStage)
  }

  handleToggleChange(selected, onStageId) {
    this.props.onSave(selected, onStageId)
  }

  render() {
    let character = _.find(this.props.play.characters, {'id': this.props.onStage.character_id})
    return (

      <div>
      {character.name}
      (<RIEInput
        value={this.state.description || 'Click to add description'}
        change={(selected) => this.handleEditClick(selected, this.props.onStage.id)}
        propName='description'
      />)
      Nonspeaking role? &nbsp; <RIEToggle
        value={this.props.onStage.nonspeaking}
        change={(selected) => this.handleEditClick(selected, this.props.onStage.id)}
        propName="nonspeaking"
      />
      <span className='right floated trash icon'
      onClick={() => this.props.onDeleteClick(this.props.actId, this.props.sceneId, this.props.frenchSceneId, this.props.onStage.id)}
    >
      <i className="fas fa-trash-alt"></i>
    </span>
    </div>
    )
  }
}

OnStageShow.propTypes = {
  actId: PropTypes.number.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onStage: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
  play: PropTypes.object.isRequired,
}

export default OnStageShow
