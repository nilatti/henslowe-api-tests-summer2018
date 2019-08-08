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
        <SceneForm
          actId={this.props.actId}
          scene={this.props.scene}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play_id={this.props.play.id}
        />
      )
    }
    return (
      <div>
        <SceneShow
          actId={this.props.actId}
          handleEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
          play={this.props.play}
          scene={this.props.scene}
          />
      </div>
    )
  }
}

SceneInfoTab.propTypes = {
  actId: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
}

export default SceneInfoTab
