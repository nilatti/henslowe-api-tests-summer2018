import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'


import { RIEInput, RIEToggle} from '@attently/riek'

class OnStageShow extends Component {
  state = {
    nonspeaking: this.props.onStage.nonspeaking,
  }
  handleToggleChange(selected, onStageId) {
    this.props.onSave(selected, onStageId)
  }

  render() {
    return (
      <div>
      {this.props.onStage.character.name}:
      (<RIEInput
        value={this.props.onStage.description || 'Click to add description'}
        change={(selected) => this.props.onSave(selected, this.props.onStage.id)}
        propName='description'
      />)
      Nonspeaking role? &nbsp; <RIEToggle
        value={this.state.nonspeaking}
        change={(selected) => this.props.onSave(selected, this.props.onStage.id)}
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
  onSave: PropTypes.func.isRequired,
  onStage: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
  play: PropTypes.object.isRequired,
}

export default OnStageShow
