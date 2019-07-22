import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'

import EditableOnStage from './OnStages/EditableOnStage'
import EntranceExitList from './EntranceExits/EntranceExitList'

class FrenchSceneShow extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.french_scene.id)
  }

  changeNonspeaking = (event, on_stage) => {
    on_stage.nonspeaking = !on_stage.nonspeaking
    this.props.handleNonspeakingClick(on_stage)
  }

  handleEditSubmit = (on_stage) => {
    this.props.handleNonspeakingClick(on_stage)
  }

  render() {
    if (this.props.french_scene.on_stages[0]) {
      var characters = this.props.french_scene.on_stages.map((on_stage) => (
        <EditableOnStage
          changeNonspeaking={this.changeNonspeaking}
          french_scene_id={this.props.french_scene.id}
          handleEditSubmit={this.handleEditSubmit}
          key={on_stage.id}
          on_stage={on_stage}
        />
      ))
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.act_number}.{this.props.scene_number}.{this.props.french_scene.number}</h2>
            <p>
              {this.props.french_scene.summary}
            </p>
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <i className="fas fa-pencil-alt"></i>
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </Col>
        </Row>
        <Row>
          {
            this.props.french_scene.start_page ?
              <p>
                Pages {this.props.french_scene.start_page} - {this.props.french_scene.end_page}
              </p>
            :
            <br />
          }
        </Row>
        <Row>
          <h3>Characters</h3>
        </Row>
        <Row>
          <ul>
            {characters}
          </ul>
        </Row>
        <Row>
          Entrances and Exits:
          <EntranceExitList frenchSceneId={this.props.french_scene.id}/>        
        </Row>
      </div>
    )
  }
}

FrenchSceneShow.defaultProps = {
  scene: {
    french_scenes: []
  },
}

FrenchSceneShow.propTypes = {
  act_number: PropTypes.number.isRequired,
  french_scene: PropTypes.object.isRequired,
  handleNonspeakingClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  scene_number: PropTypes.number.isRequired,
}

export default FrenchSceneShow
