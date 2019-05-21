import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import FrenchSceneForm from './FrenchSceneForm.js'

class FrenchSceneFormToggle extends Component { //opens form for create action
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (act) => {
    this.handleFormClose()
    this.props.onFormSubmit(act)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <FrenchSceneForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
          play_id={this.props.play_id}
          scene_id={this.props.scene_id}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add New French Scene
          </Button>
        </div>
      );
    }
  }
}

FrenchSceneFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
  scene_id: PropTypes.number.isRequired,
}

export default FrenchSceneFormToggle