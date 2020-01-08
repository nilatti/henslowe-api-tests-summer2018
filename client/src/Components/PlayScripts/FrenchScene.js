import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'

class FrenchScene extends Component {
  render() {
    let french_scene = this.props.french_scene
    return (
      <div id="french-scene-{french_scene.number}">
        {french_scene.number}
      </div>
    )
  }
}

FrenchScene.propTypes = {
  french_scene: PropTypes.object.isRequired
}

export default FrenchScene
