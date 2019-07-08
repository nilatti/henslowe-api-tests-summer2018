import React, {
  Component
} from 'react'

class OnStageShow extends Component {
  render() {
    if (this.props.on_stage.nonspeaking) {
      return <li key={this.props.on_stage.character.id} onClick={(e) => this.props.changeNonspeaking(e, this.props.on_stage)}>{this.props.on_stage.character.name}* {this.props.on_stage.description}<span onClick={this.props.handleEditClick}>Edit details</span></li>
    } else {
      return <li key={this.props.on_stage.character.id} onClick={(e) => this.props.changeNonspeaking(e, this.props.on_stage)}>{this.props.on_stage.character.name} {this.props.on_stage.description}<span onClick={this.props.handleEditClick}>Edit details</span></li>
    }
  }
}

export default OnStageShow
