import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Glyphicon,
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

  async updateServerFrenchScene(frenchSceneAttrs) {
    const response = await updateServerFrenchScene(frenchSceneAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating French scene'
      })
    } else {
      this.setState(state => {
        const frenchSceneList = state.french_scenes.map((french_scene) => {
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
  }
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.scene.id)
  }

  handleFrenchSceneCreateClick = (frenchScene) => {
    this.createFrenchScene(this.props.scene.id, frenchScene)
  }

  handleFrenchSceneDeleteClick = (frenchSceneId) => {
    this.deleteFrenchScene(frenchSceneId)
  }

  handleEditFrenchSceneSubmit = (frenchScene) => {
    this.updateServerFrenchScene(frenchScene)
  }
  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let frenchSceneTabs
    if (this.state.french_scenes[0]) {
      frenchSceneTabs = this.state.french_scenes.map((french_scene) =>
        <Tab eventKey={`french_scene-${french_scene.id}`} title={`${french_scene.number}`} key={`french_scene-${french_scene.id}`}>
          <FrenchSceneInfoTab
            act_number={this.props.act_number}
            french_scene={french_scene}
            scene_id={this.props.scene.id}
            scene_number={this.props.scene.number}
            onDeleteClick={this.handleFrenchSceneDeleteClick}
            handleEditSubmit={this.handleEditFrenchSceneSubmit}
          />
        </Tab>
      )
    } else {
      frenchSceneTabs = <div>No French scenes found</div>
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>Act {this.props.act_number}, Scene {this.props.scene.number}</h2>
            <p>
              {this.props.scene.summary}
            </p>
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <Glyphicon glyph="pencil" />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <Glyphicon glyph="glyphicon glyphicon-trash" />
            </span>
          </Col>
        </Row>
        <Row>
          <h2>French Scenes</h2>
        </Row>
        <Row>
          <FrenchSceneFormToggle scene_id={this.props.scene.id} isOpen={false} onFormSubmit={this.handleFrenchSceneCreateClick} />
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
  act_number: PropTypes.number.isRequired,
  scene: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}

export default SceneShow