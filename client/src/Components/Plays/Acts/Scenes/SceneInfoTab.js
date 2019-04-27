import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import SceneForm from './SceneForm'
import SceneShow from './SceneShow'

class SceneInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false
    })
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.scene.id)
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
        <SceneForm scene={this.props.scene} act_id={this.props.act_id} onFormClose={this.handleFormClose} onFormSubmit={this.handleSubmit} />
      )
    }
    return (
      <div>
        <SceneShow
          act_number={this.props.act_number}
          handleEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
          scene={this.props.scene}
          />
      </div>
    )
  }
}

SceneInfoTab.propTypes = {
  scene: PropTypes.object.isRequired,
  act_id: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default SceneInfoTab