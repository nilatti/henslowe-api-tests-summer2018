import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button} from 'react-bootstrap'

import { RIEInput} from 'riek'
import _ from 'lodash'

import {
  createEntranceExit,
  deleteEntranceExit,
  getEntranceExits,
  updateServerEntranceExit
} from '../../../../../../api/entrance_exits'

import {
  getActorsForProduction
} from '../../../../../../api/jobs'

import NewEntranceExitForm from './NewEntranceExitForm'

class EntranceExitsList extends Component {
  state = {
    availableActors: [],
    newEntranceExitFormOpen: false,
    entranceExits: [],
    stageExits: [],
  }

  componentDidMount() {
    this.loadEntranceExitsFromServer()
    // this.loadStageExitsFromServer()
    this.loadActorsFromServer()
  }

  createNewEntranceExit = (entranceExit) => {
    this.createServerEntranceExit(entranceExit)
  }

  handleToggleClick = () => {
    this.setState({newEntranceExitFormOpen: true})
  }

  onDeleteClick = (entranceExitId) => {
    this.deleteEntranceExit(entranceExitId)
  }

  onSave = (nameObj, entranceExitId) => {
    let entranceExitObj = {
      id: entranceExitId,
      name: nameObj['name']
    }
    this.updateServerEntranceExit(entranceExitObj)
  }

  async createServerEntranceExit(entranceExit) {
    const response = await createEntranceExit(this.props.frenchSceneId, entranceExit)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating stage exit'
      })
    } else {
      this.setState({
        entranceExits: [...this.state.entranceExits, response.data].sort((a, b) => (a.name > b.name) - (a.name < b.name))
      })
    }
  }

  async deleteEntranceExit(entranceExitId) {
    const response = await deleteEntranceExit(entranceExitId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting stage exit'
      })
    } else {
      this.setState({
        entranceExits: this.state.entranceExits.filter(entranceExit =>
          entranceExit.id !== entranceExitId
        )
      })
    }
  }

  async loadActorsFromServer() {
    const response = await getActorsForProduction(47)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching actors'
      })
    } else {
      this.setState({
        availableActors: response.data
      })
    }
  }

  async loadEntranceExitsFromServer() {
    const response = await getEntranceExits(this.props.frenchSceneId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching stage exits'
      })
    } else {
      this.setState({
        entranceExits: response.data
      })
    }
  }

  async updateServerEntranceExit(entranceExitAttrs) {
    const response = await updateServerEntranceExit(entranceExitAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating stage exits'
      })
    } else {
      this.setState(state => {
        const entranceExitList = state.entranceExits.map((entranceExit) => {
          if (entranceExit.id === entranceExitAttrs.id) {
            return entranceExitAttrs
          } else {
            return entranceExit
          }
        })
        const entranceExitListSorted = entranceExitList.sort((a, b) => (a.name > b.name) - (a.name < b.name))
        return {
          entranceExits: entranceExitListSorted
        }
      })
    }
  }

  render() {
    let entranceExits = this.state.entranceExits.map(entranceExit =>
      <li key={entranceExit.id}>
          {entranceExit.id}
          <span className='right floated trash icon'
          onClick={() => this.onDeleteClick(entranceExit.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </li>
    )
    return (
      <div>
        <h3>Stage Exits</h3>
        <p><em>Click to edit name</em></p>
        <ul>
          {entranceExits}
        </ul>
        { this.state.newEntranceExitFormOpen ?
          <NewEntranceExitForm frenchSceneId={this.props.frenchSceneId} onFormClose={this.handleToggleClick} onFormSubmit={this.createNewEntranceExit}/>
          :
          <Button
            onClick={this.handleToggleClick}
          >
            Add New
          </Button>
        }

      </div>
    )
  }
}

EntranceExitsList.propTypes = {
  frenchSceneId: PropTypes.number.isRequired,
}

export default EntranceExitsList
