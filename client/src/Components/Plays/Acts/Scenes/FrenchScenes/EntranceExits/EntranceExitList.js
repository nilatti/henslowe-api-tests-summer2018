import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button} from 'react-bootstrap'

import _ from 'lodash'

import EntranceExitShow from './EntranceExitShow'
import NewEntranceExitForm from './NewEntranceExitForm'

class EntranceExitsList extends Component {
  state = {
    newEntranceExitFormOpen: false,
    entranceExits: [],
  }

  toggleForm = () => {
    this.setState({newEntranceExitFormOpen: !this.state.newEntranceExitFormOpen})
  }

  render() {
    let act = _.find(this.props.play.acts, {'id': this.props.actId})
    let scene = _.find(act.scenes, {'id': this.props.sceneId})
    let frenchScene = _.find(scene.french_scenes, {'id': this.props.frenchSceneId})
    let entranceExits = <div>No entrances or exits listed</div>
    if (frenchScene.entrance_exits) {
      let orderedEntranceExits = _.orderBy(frenchScene.entrance_exits, 'line')
      entranceExits = orderedEntranceExits.map(entranceExit =>
        <li key={entranceExit.id}>
          <EntranceExitShow
            actId={this.props.actId}
            frenchSceneId={this.props.frenchSceneId}
            onDeleteClick={this.props.onDeleteClick}
            play={this.props.play}
            production={this.props.production}
            onEdit={this.props.handleEntranceExitEditFormSubmit}
            entranceExit={entranceExit}
            sceneId={this.props.sceneId}
          />
        </li>
      )
    }

    return (
      <div>
        <h3>Entrance Exits {this.props.frenchSceneId}</h3>
        <p><em>Click to edit name</em></p>
        <ul>
          {entranceExits}
        </ul>
        { this.state.newEntranceExitFormOpen ?
          <NewEntranceExitForm
            actId={this.props.actId}
            characters={this.props.play.characters}
            frenchSceneId={this.props.frenchSceneId}
            onFormClose={this.toggleForm}
            onFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
            sceneId={this.props.sceneId}
            stageExits={this.props.production.stage_exits}
          />
          :
          <Button
            onClick={this.toggleForm}
          >
            Add New
          </Button>
        }

      </div>
    )
  }
}

EntranceExitsList.propTypes = {
  actId: PropTypes.number.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  production: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
}

export default EntranceExitsList
