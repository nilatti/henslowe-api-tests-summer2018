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

import OnStagesList from './OnStages/OnStagesList'
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
            <OnStagesList
              frenchSceneId={this.props.french_scene.id}
              on_stages={this.props.on_stages}
              play={this.props.play}
            />
          </ul>
        </Row>
        {
          !this.props.play.canonical
          ? <Row>
            <EntranceExitList
              frenchSceneId={this.props.french_scene.id}
              play={this.props.play}
            />
          </Row>
          : <span></span>

        }

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
  play: PropTypes.object.isRequired,
  scene_number: PropTypes.number.isRequired,
}

export default FrenchSceneShow
