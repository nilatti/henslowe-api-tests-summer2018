import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import FrenchSceneForm from './FrenchSceneForm'
import FrenchSceneShow from './FrenchSceneShow'

class FrenchSceneInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false
    })
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.french_scene.id)
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }
  handleSubmit = (scene) => {
    this.props.handleEditSubmit(scene)
    this.closeForm()
  }
  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }


  render() {
    if (this.state.editFormOpen) {
      return (
        <FrenchSceneForm
          french_scene={this.props.french_scene}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          scene_id={this.props.scene_id}
        />
      )
    }
    return (
      <div>
        <FrenchSceneShow
          act_number={this.props.act_number}
          french_scene={this.props.french_scene}
          handleEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
          scene_number={this.props.scene_number}
        />
      </div>
    )
  }
}

FrenchSceneInfoTab.propTypes = {
  act_number: PropTypes.number.isRequired,
  french_scene: PropTypes.object.isRequired,
  scene_id: PropTypes.number.isRequired,
  scene_number: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default FrenchSceneInfoTab