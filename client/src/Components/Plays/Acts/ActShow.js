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

import SceneFormToggle from './Scenes/SceneFormToggle'
import SceneInfoTab from './Scenes/SceneInfoTab'

import {
  createScene,
  deleteScene,
  updateServerScene,
} from '../../../api/scenes'

class ActShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      scenes: this.props.act.scenes,
      key: ''
    };
  }

  async createScene(actId, scene) {
    const response = await createScene(actId, scene)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating scene'
      })
    } else {
      this.setState({
        scenes: [...this.state.scenes, response.data].sort((a, b) => (a.number - b.number))
      })
      this.setState({
        key: response.data.id
      })
    }
  }

  async deleteScene(sceneId) {
    const response = await deleteScene(sceneId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting scene'
      })
    } else {
      this.setState({
        scenes: this.state.scenes.filter(scene =>
          scene.id !== sceneId
        )
      })
    }
  }

  async updateServerScene(sceneAttrs) {
    const response = await updateServerScene(sceneAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating scene'
      })
    } else {
      this.setState(state => {
        const sceneList = state.scenes.map((scene) => {
          if (scene.id === sceneAttrs.id) {
            return sceneAttrs
          } else {
            return scene
          }
        })
        return {
          scenes: sceneList
        }
      })
    }
  }
  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.act.id)
  }

  handleSceneCreateClick = (scene) => {
    this.createScene(this.props.act.id, scene)
  }

  handleSceneDeleteClick = (sceneId) => {
    this.deleteScene(sceneId)
  }

  handleEditSceneSubmit = (scene) => {
    this.updateServerScene(scene)
  }
  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let sceneTabs
    if (this.state.scenes[0]) {
      sceneTabs = this.state.scenes.map((scene) =>
        <Tab eventKey={`scene-${scene.id}`} title={`Scene ${scene.number}`} key={`scene-${scene.id}`}>
          <SceneInfoTab
            scene={scene}
            act_id={this.props.act.id}
            act_number={this.props.act.number}
            handleEditSubmit={this.handleEditSceneSubmit}
            onDeleteClick={this.handleSceneDeleteClick}
            play={this.props.play}
          />
        </Tab>
      )
    } else {
      sceneTabs = <div>No scenes found</div>
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>Act {this.props.act.number}</h2>
            <p>
              {this.props.act.summary}
            </p>
            {
              this.props.act.start_page ?
                <p>
                  Pages {this.props.act.start_page} - {this.props.act.end_page}
                </p>
              :
              <br />
            }
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
        <h2>Scenes</h2>
        </Row>
        <Row>
          <SceneFormToggle act_id={this.props.act.id} isOpen={false} onFormSubmit={this.handleSceneCreateClick} />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="scene-info-tabs"
        >
          {sceneTabs}
        </Tabs>
      </div>
    )
  }
}

ActShow.defaultProps = {
  act: {
    scenes: []
  },
}

ActShow.propTypes = {
  act: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default ActShow
