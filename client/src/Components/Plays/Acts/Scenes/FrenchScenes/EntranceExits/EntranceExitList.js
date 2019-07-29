import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button} from 'react-bootstrap'

import _ from 'lodash'

import {
  createEntranceExit,
  deleteEntranceExit,
  getEntranceExits,
  updateServerEntranceExit
} from '../../../../../../api/entrance_exits'

import {
  getStageExits
} from '../../../../../../api/stage_exits'

import EntranceExitShow from './EntranceExitShow'
import NewEntranceExitForm from './NewEntranceExitForm'

class EntranceExitsList extends Component {
  state = {
    characters: this.props.play.characters,
    newEntranceExitFormOpen: false,
    entranceExits: [],
    stageExits: [],
  }

  componentDidMount() {
    this.loadEntranceExitsFromServer()
    this.loadStageExitsFromServer()
  }

  createNewEntranceExit = (entranceExit) => {
    this.createServerEntranceExit(entranceExit)
    this.handleToggleClick()
  }

  handleToggleClick = () => {
    this.setState({newEntranceExitFormOpen: !this.state.newEntranceExitFormOpen})
  }

  onDeleteClick = (entranceExitId) => {
    this.deleteEntranceExit(entranceExitId)
  }

  onSave = (formObj, entranceExitId) => {
    const k = Object.keys(formObj)[0]
    let entranceExitObj = {}
    entranceExitObj[k] = formObj[k]
    entranceExitObj['id'] = entranceExitId
    this.updateServerEntranceExit(entranceExitObj, entranceExitId)
  }

  async createServerEntranceExit(entranceExit) {
    const response = await createEntranceExit(this.props.frenchSceneId, entranceExit)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating stage exit'
      })
    } else {
      let newEntranceExit = {
        category: entranceExit.category,
        character: {
          id: entranceExit.character_id,
          name: entranceExit.character_name,
        },
        id: response.data.id,
        line: entranceExit.line,
        notes: entranceExit.notes,
        page: entranceExit.page,
        stage_exit: {
          id: entranceExit.stage_exit_id,
          name: entranceExit.stage_exit_name,
        }
      }
      this.setState({
        entranceExits: _.sortBy([...this.state.entranceExits, newEntranceExit], ['line', 'page','character'], ['asc', 'asc','asc'])
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

  async loadStageExitsFromServer() {
    const response = await getStageExits(this.props.play.production_id)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching stage exits'
      })
    } else {
      this.setState({
        stageExits: response.data
      })
    }
  }

  async updateServerEntranceExit(entranceExitAttrs, entranceExitId) {
    const response = await updateServerEntranceExit(entranceExitAttrs, entranceExitId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating stage exits'
      })
    } else {
      console.log('inside async', entranceExitAttrs)
      this.setState(state => {
        const entranceExitList = state.entranceExits.map((entranceExit) => {
          if (entranceExit.id === entranceExitAttrs.id) {
            let newEntranceExit = Object.assign(entranceExit, entranceExitAttrs)
            return newEntranceExit
          } else {
            return entranceExit
          }
        })
        const entranceExitListSorted = _.sortBy(entranceExitList, ['line', 'page','character'], ['asc', 'asc','asc'])
        return {
          entranceExits: entranceExitListSorted
        }
      })
    }
  }

  render() {
    let entranceExits = this.state.entranceExits.map(entranceExit =>
      <li key={entranceExit.id}>
        <EntranceExitShow
          characters={this.props.play.characters}
          entranceExit={entranceExit}
          onDeleteClick={this.onDeleteClick}
          onSave={this.onSave}
          stageExits={this.state.stageExits}
        />
      </li>
    )
    return (
      <div>
        <h3>Entrance Exits</h3>
        <p><em>Click to edit name</em></p>
        <ul>
          {entranceExits}
        </ul>
        { this.state.newEntranceExitFormOpen ?
          <NewEntranceExitForm
            characters={this.state.characters}
            frenchSceneId={this.props.frenchSceneId}
            onFormClose={this.handleToggleClick}
            onFormSubmit={this.createNewEntranceExit}
            stageExits={this.state.stageExits}
          />
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
  play: PropTypes.object.isRequired,
}

export default EntranceExitsList
