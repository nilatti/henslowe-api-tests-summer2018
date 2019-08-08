import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button} from 'react-bootstrap'

import { RIEInput} from '@attently/riek'
import _ from 'lodash'

import {
  createOnStage,
  deleteOnStage,
  getOnStages,
  updateServerOnStage
} from '../../../../../../api/on_stages'

import NewOnStageForm from './NewOnStageForm'
import OnStageShow from './OnStageShow'

class OnStagesList extends Component {
  state = {
    newOnStageFormOpen: false,
    onStages: [],
  }

  // componentDidMount() {
  //   this.loadOnStagesFromServer()
  // }

  closeForm = () => {
    this.setState({newOnStageFormOpen: false})
  }

  createNewOnStage = (onStage) => {
    this.createServerOnStage(onStage)
    this.closeForm()
  }

  handleToggleClick = () => {
    this.setState({newOnStageFormOpen: true})
  }

  onDeleteClick = (onStageId) => {
    this.deleteOnStage(onStageId)
  }

  onSave = (nameObj, onStageId) => {
    let onStageObj = {
      id: onStageId,
      description: nameObj['description'],
      nonspeaking: nameObj['nonspeaking']
    }
    this.updateServerOnStage(onStageObj)
  }

  async createServerOnStage(onStage) {
    const response = await createOnStage(onStage)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating stage exit'
      })
    } else {
      let newOnStage = {
        category: "Character",
        character: {
          id: onStage.character_id,
          name: onStage.character_name,
        },
        id: response.data.id,
        character_id: onStage.character_id,
        description: onStage.description,
        nonspeaking: onStage.nonspeaking,
      }
      this.setState({
        onStages: [...this.state.onStages, newOnStage].sort((a, b) => (a.name > b.name) - (a.name < b.name))
      })
    }
  }

  async deleteOnStage(onStageId) {
    const response = await deleteOnStage(onStageId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting stage exit'
      })
    } else {
      this.setState({
        onStages: this.state.onStages.filter(onStage =>
          onStage.id !== onStageId
        )
      })
    }
  }

  async loadOnStagesFromServer() {
    const response = await getOnStages(this.props.frenchSceneId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching stage exits'
      })
    } else {
      this.setState({
        onStages: _.orderBy(response.data, ['nonspeaking', 'character.name'])
      })
    }
  }

  async updateServerOnStage(onStageAttrs) {
    const response = await updateServerOnStage(onStageAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating stage exits'
      })
    } else {
      this.setState(state => {
        const onStageList = state.onStages.map((onStage) => {
          if (onStage.id === onStageAttrs.id) {
            return {
              id: onStage.id,
              description: onStage.description,
              character: onStage.character
            }
          } else {
            return onStage
          }
        })
        const onStageListSorted = _.orderBy(onStageList, ['nonspeaking', 'character.name'])
        return {
          onStages: onStageListSorted
        }
      })
    }
  }

  render() {
    let onStages = this.state.onStages.map(onStage =>
      <li key={onStage.id}>
        <OnStageShow
          onDeleteClick={this.onDeleteClick}
          play={this.props.play}
          onSave={this.onSave}
          onStage={onStage}
        />
      </li>
    )
    return (
      <div>
        <h3>On Stages</h3>
        <p><em>Click to edit</em></p>
        <ul>
          {onStages}
        </ul>
        { this.state.newOnStageFormOpen ?
          <NewOnStageForm
            characters={this.props.play.characters}
            frenchSceneId={this.props.frenchSceneId}
            onFormClose={this.closeForm}
            onFormSubmit={this.createNewOnStage}
            play={this.props.play}
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

OnStagesList.propTypes = {
  frenchSceneId: PropTypes.number.isRequired,
  play: PropTypes.object.isRequired,
}

export default OnStagesList
