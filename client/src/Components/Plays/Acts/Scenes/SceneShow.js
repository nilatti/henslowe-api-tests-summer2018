import _ from 'lodash'
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

import FrenchSceneFormToggle from './FrenchScenes/FrenchSceneFormToggle'
import FrenchSceneInfoTab from './FrenchScenes/FrenchSceneInfoTab'

class SceneShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.actId, this.props.scene.id)
  }

  handleFrenchSceneCreateClick = (frenchScene) => {
    this.props.handleFrenchSceneCreateFormSubmit(this.props.actId, this.props.scene.id, frenchScene)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  updateFrenchSceneAttrsForServer = (frenchSceneAttrs) => {
    const {
      characters,
      ...attrsForApi
    } = frenchSceneAttrs
    return attrsForApi
  }

  render() {
    let act = _.find(this.props.play.acts, {'id': this.props.actId})
    let scene = _.find(act.scenes, {'id': this.props.scene.id})
    let frenchSceneTabs = scene.french_scenes.map((french_scene) =>
        <Tab eventKey={`french_scene-${french_scene.id}`} title={`${french_scene.number}`} key={`french_scene-${french_scene.id}`}>
          <FrenchSceneInfoTab
            actId={act.id}
            actNumber={act.number}
            french_scene={french_scene}
            handleEditSubmit={this.props.handleFrenchSceneEditFormSubmit}
            onDeleteClick={this.props.handleFrenchSceneDeleteClick}
            play={this.props.play}
            sceneId={scene.id}
            sceneNumber={scene.number}
          />
        </Tab>
      )
    return (
      <div>
        <Row>
          <Col>
            <h2>Act {act.number}, Scene {this.props.scene.number}</h2>
            <p>
              {this.props.scene.summary}
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
        {
          this.props.scene.start_page ?
            <p>
              Pages {this.props.scene.start_page} - {this.props.scene.end_page}
            </p>
          :
          <br />
        }
        <Row>
          <h2>French Scenes</h2>
        </Row>
        <Row>
          <FrenchSceneFormToggle
            isOpen={false}
            onFormSubmit={this.handleFrenchSceneCreateClick}
            play_id={this.props.play.id}
            scene_id={this.props.scene.id}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="french-scene-info-tabs"
        >
          {frenchSceneTabs}
        </Tabs>
      </div>
    )
  }
}

SceneShow.defaultProps = {
  scene: {
    french_scenes: []
  },
}

SceneShow.propTypes = {
  actId: PropTypes.number.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleFrenchSceneCreateFormSubmit: PropTypes.func.isRequired,
  handleFrenchSceneDeleteClick: PropTypes.func.isRequired,
  handleFrenchSceneEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
}

export default SceneShow
