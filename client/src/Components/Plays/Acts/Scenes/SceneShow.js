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

import {
  createFrenchScene,
  deleteFrenchScene,
  updateServerFrenchScene,
} from '../../../../api/french_scenes'

class SceneShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      french_scenes: this.props.scene.french_scenes,
      key: ''
    };
  }

  async createFrenchScene(sceneId, frenchScene) {
    const response = await createFrenchScene(sceneId, frenchScene)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating French scene'
      })
    } else {
      this.setState({
        french_scenes: [...this.state.french_scenes, response.data]
      })
      this.setState({
        key: response.data.id
      })
    }
  }

  async deleteFrenchScene(frenchSceneId) {
    const response = await deleteFrenchScene(frenchSceneId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting French scene'
      })
    } else {
      this.setState({
        french_scenes: this.state.french_scenes.filter(french_scene =>
          french_scene.id !== frenchSceneId
        )
      })
    }
  }

  async updateServerFrenchScene(attrsForApi) {
    const response = await updateServerFrenchScene(attrsForApi)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating French scene'
      })
    }
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.actId, this.props.scene.id)
  }

  handleFrenchSceneCreateClick = (frenchScene) => {
    this.createFrenchScene(this.props.scene.id, frenchScene)
  }

  handleFrenchSceneDeleteClick = (frenchSceneId) => {
    this.deleteFrenchScene(frenchSceneId)
  }

  handleEditFrenchSceneSubmit = (frenchScene) => {
    this.updateServerFrenchScene(this.updateFrenchSceneAttrsForServer(frenchScene))
    this.updateFrenchSceneAttrsForState(frenchScene)
  }

  // handleEditOnStageSubmit = (onStage) => {
  //   this.updateServerOnStage(onStage)
  // }

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

  async updateFrenchSceneAttrsForState(frenchSceneAttrs) {
    this.setState(state => {
      const frenchSceneList = this.state.french_scenes.map((french_scene) => {
        if (french_scene.id === frenchSceneAttrs.id) {
          return frenchSceneAttrs
        } else {
          return french_scene
        }
      })
      return {
        french_scenes: frenchSceneList
      }
    })
  }
  render() {
    let act = _.find(this.props.play.acts, {'id': this.props.actId})
    let scene = _.find(act.scenes, {'id': this.props.scene.id})
    let frenchSceneTabs = <div></div>
    // if (this.state.french_scenes[0]) {
    //   frenchSceneTabs = this.state.french_scenes.map((french_scene) =>
    //     <Tab eventKey={`french_scene-${french_scene.id}`} title={`${french_scene.number}`} key={`french_scene-${french_scene.id}`}>
    //       <FrenchSceneInfoTab
    //         actId={this.props.actId}
    //         french_scene={french_scene}
    //         handleEditSubmit={this.handleEditFrenchSceneSubmit}
    //         onDeleteClick={this.handleFrenchSceneDeleteClick}
    //         play={this.props.play}
    //         sceneId={this.props.scene.id}
    //       />
    //     </Tab>
    //   )
    //   const act = _.find(this.props.play.acts, {'id': this.props.act.id})
    //   console.log('act is', act)
    // } else {
    //   frenchSceneTabs = <div>No French scenes found</div>
    // }
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
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
}

export default SceneShow
