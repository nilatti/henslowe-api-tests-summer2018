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


class FrenchSceneShow extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.french_scene.id)
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
        {
          this.props.french_scene.start_page ?
            <p>
              Pages {this.props.french_scene.start_page} - {this.props.french_scene.end_page}
            </p>
          :
          <br />
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
  handleEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  scene_number: PropTypes.number.isRequired,
}

export default FrenchSceneShow