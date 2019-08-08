import _ from 'lodash'

import React, {
  Component
} from 'react'

import {
  Redirect
} from 'react-router-dom'

import {
  createItemWithParent,
  deleteItem,
  getItem,
  updateServerItem
} from '../../api/crud'
import {
  updateServerPlay
} from '../../api/plays'

import PlayShow from './PlayShow'
import PlayForm from './PlayForm'

class EditablePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      play: null,
      toPlaysList: false,
    }
  }

  async createAct(playId, act) {
    const response = await createItemWithParent('play', playId, 'act', act)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating act'
      })
    } else {
      let newActs = this.sortActs([...this.state.play.acts, response.data])
      this.setState({
        play: {...this.state.play, acts: newActs}
      })
    }
  }

  async createCharacter(playId, character) {
    const response = await createItemWithParent('play', playId, 'character', character)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating character'
      })
    } else {
      let newCharacters = _.sortBy([...this.state.play.characters, response.data], 'name')
      this.setState({
        play: {...this.state.play, characters: newCharacters}
      })
    }
  }

  async deleteAct(actId) {
    const response = await deleteItem(actId, 'act')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting act'
      })
    } else {
      this.setState({
        play: {
          ...this.state.play,
          acts: this.state.play.acts.filter(act => act.id !== actId)
          }
      })
    }
  }

  async deleteCharacter(characterId) {
    const response = await deleteItem(characterId, 'character')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting character'
      })
    } else {
      this.setState({
        play: {
          ...this.state.play,
          characters: this.state.play.characters.filter(character => character.id !== characterId)
          }
      })
    }
  }

  async deletePlay(playId) {
    const response = await deleteItem(playId, 'play')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting play'
      })
    } else {
      this.props.history.push('/plays')
    }
  }

  async loadPlayFromServer(playId) {
    const response = await getItem(playId, "play")
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching play'
      })
    } else {
      this.setState({
        play: response.data
      })
    }
  }

  async updateAct(updatedAct) {
    const response = await updateServerItem(updatedAct, 'act')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating act'
      })
    } else {
      let newActs = this.state.play.acts.map((act) => {
        if (act.id === updatedAct.id) {
          return {...act, ...updatedAct}
        } else {
          return act
        }
      }
    )
    this.setState({
      play: {
        ...this.state.play,
        acts: this.sortActs(newActs)
      }
    })
  }
}

async updateCharacter(updatedCharacter) {
  const response = await updateServerItem(updatedCharacter, 'character')
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating character'
    })
  } else {
    let newCharacters = this.state.play.characters.map((character) => {
      if (character.id === updatedCharacter.id) {
        return {...character, ...updatedCharacter}
      } else {
        return character
      }
    }
  )
  this.setState({
    play: {
      ...this.state.play,
      characters: newCharacters
      }
    })
  }
}

  async updatePlayOnServer(play) {
    const response = await updateServerPlay(play)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating play'
      })
    } else {
      this.setState({
        play: response.data
      })
    }
  }

  addNewCharacter = (newCharacter) => {
    this.setState((prevState) => ({
      play: {
        ...prevState.play,
        characters: [...prevState.play.characters, newCharacter]
      }
    }))
  }

  componentDidMount = () => {
    this.loadPlayFromServer(this.props.match.params.playId)
  }

  handleFormClose = () => {
    this.toggleeForm()
  }

  handleSubmit = (play) => {
    this.updatePlayOnServer(play)
    this.toggleForm()
  }

  onActCreateFormSubmit = (act) => {
    this.createAct(this.state.play.id, act)
  }

  onActDeleteClick = (actId) => {
    this.deleteAct(actId)
  }

  onActEditFormSubmit = (act) => {
    this.updateAct(act)
  }

  onCharacterCreateFormSubmit = (character) => {
    this.createCharacter(this.state.play.id, character)
  }

  onCharacterDeleteClick = (characterId) => {
    this.deleteCharacter(characterId)
  }

  onCharacterEditFormSubmit = (character) => {
    this.updateCharacter(character)
  }

  onDeleteClick = (playId) => {
    this.deletePlay(playId)
  }

  onEditClick = () => {
    this.toggleForm()
  }

  sortActs = (acts) => {
    return _.orderBy(acts, 'number')
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
    if (this.state.toPlaysList === true) {
      return <Redirect to='/plays' />
    }
    if (this.state.editFormOpen) {
      return (
        <PlayForm
          isOnAuthorPage={false}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play={this.state.play}
        />
      )
    }
    if (this.state.play === null) {
      return (
        <div>Loading!</div>
      )
    }
    console.log('play is ', this.state.play)
    return (
      <PlayShow
        handleActCreateFormSubmit={this.onActCreateFormSubmit}
        handleActDeleteClick={this.onActDeleteClick}
        handleActEditFormSubmit={this.onActEditFormSubmit}
        handleCharacterCreateFormSubmit={this.onCharacterCreateFormSubmit}
        handleCharacterDeleteClick={this.onCharacterDeleteClick}
        handleCharacterEditFormSubmit={this.onCharacterEditFormSubmit}
        handleDeleteClick={this.onDeleteClick}
        handleEditClick={this.onEditClick}
        play={this.state.play}
      />
    )
  }
}

export default EditablePlay
