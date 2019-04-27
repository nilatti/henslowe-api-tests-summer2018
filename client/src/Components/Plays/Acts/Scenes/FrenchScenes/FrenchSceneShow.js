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