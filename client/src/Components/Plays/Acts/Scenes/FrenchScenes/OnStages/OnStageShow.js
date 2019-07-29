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
      onClick={() => this.props.onDeleteClick(this.props.onStage.id)}
    >
      <i className="fas fa-trash-alt"></i>
    </span>
    </div>
    )
  }
}

OnStageShow.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onStage: PropTypes.object.isRequired,
  play: PropTypes.object.isRequired,
}

export default OnStageShow
