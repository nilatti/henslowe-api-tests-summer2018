import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import { Form } from 'react-bootstrap'


import { RIEInput, RIEToggle} from '@attently/riek'

class OnStageShow extends Component {
  state = {
    description: '',
    descriptionEditOpen: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDescriptionSave = () => {
    let workingOnStage = {...this.props.onStage, description: this.state.description}
    this.props.onEdit(this.props.actId, this.props.sceneId, this.props.frenchSceneId, workingOnStage)
  }

  handleKeyPress = e => {
    console.log('key', e.key)
    // We pass the new value of the text when calling onAccept
    if (e.key === "Enter") {
      this.toggleDescriptionEdit()
      this.handleDescriptionSave()
    } else if (e.key === "Escape") {
      this.toggleDescriptionEdit()
    }
  }

  handleNonspeakingClick = (bool) => {
    let workingOnStage = {...this.props.onStage, nonspeaking: bool}
    this.props.onEdit(this.props.actId, this.props.sceneId, this.props.frenchSceneId, workingOnStage)
  }


  toggleDescriptionEdit = () => {
    this.setState({
      descriptionEditOpen: !this.state.descriptionEditOpen
    })
  }

  render() {
    let character = _.find(this.props.play.characters, {'id': this.props.onStage.character_id})
    let onStage = this.props.onStage.nonspeaking
    return (

      <div>
      {character.name} &nbsp;
      {
        this.state.descriptionEditOpen
        ?
        <Form.Group>
        <Form.Label>
          Description
        </Form.Label>
          <Form.Control
            type="textarea"
            placeholder={this.props.onStage.description || 'description'}
            name="description"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            value={this.state.description || ''}
          />
        </Form.Group>
        : <span onClick={() => this.toggleDescriptionEdit()}>{this.props.onStage.description|| 'Click to edit description'}</span>
      }

      &nbsp; Nonspeaking role? {this.props.onStage.nonspeaking ? <span onClick={() => this.handleNonspeakingClick(false)}>yes</span> : <span onClick={() => this.handleNonspeakingClick(true)}>no</span>}

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
