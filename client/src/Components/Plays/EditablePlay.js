import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link, Redirect } from 'react-router-dom'

import { deleteAct } from '../../api/acts'
import { deleteCharacter } from '../../api/characters'
import { deleteItem, getItem } from '../../api/crud'
import { createAct, createCharacter, getActs  } from '../../api/plays'

import PlayShow from './PlayShow'
import PlayForm from './PlayForm'

class EditablePlay extends Component {
  constructor(props){
    super(props)
    this.state = {
      editFormOpen: false,
      play: null,
      toPlaysList: false,
    }
  }

  async createAct (playId, act) {
    const response = await createAct(playId, act)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error creating act' })
    } else {
      this.addNewAct(response.data)
    }
  }

  async createCharacter(playId, character) {
    const response = await createCharacter(playId, character)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error creating character' })
    } else {
      this.addNewCharacter(response.data)
    }
  }

  async deleteAct (actId) {
    const response = await deleteAct(actId)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error deleting act'})
    } else {
      this.removeAct(actId)
      this.props.history.push(`/plays/${this.state.play.id}`)
    }
  }

  async deleteCharacter (characterId) {
    const response = await deleteCharacter(characterId)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error deleting character'})
    } else {
      this.removeCharacter(characterId)
      this.props.history.push(`/plays/${this.state.play.id}`)
    }
  }

  async deletePlay (playId) {
    const response = await deleteItem(playId, 'play')
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error deleting play'})
    } else {
      this.props.history.push('/plays')
    }
  }

  async loadPlayFromServer (playId) {
    const response = await getItem(playId, "play")
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching play' })
    } else {
      this.setState({ play: response.data })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        play: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  addNewAct = (newAct) => {
    let newActs = [...this.state.play.acts, newAct]
    let sortedNewActs = this.sortActs(newActs)
    this.setState((prevState) => ({
      play: {
          ...prevState.play,
          acts: sortedNewActs,
        }
      })
    )
  }

  addNewCharacter = (newCharacter) => {
    this.setState((prevState) => ({
      play: {
          ...prevState.play,
          characters: [...prevState.play.characters, newCharacter]
        }
      })
    )
  }

  closeForm = () => {
    this.setState({ editFormOpen: false })
  }

  componentDidMount = () => {
      this.loadPlayFromServer(this.props.match.params.playId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.play === null || prevProps.match.params.playId !== this.props.match.params.playId) {
      this.loadPlayFromServer(this.props.match.params.playId);
    }
  }
  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (play) => {
    this.props.onFormSubmit(play)
    this.closeForm()
  }

  onActCreateFormSubmit = (act) => {
    this.createAct(this.state.play.id, act)
  }

  onActDeleteClick = (actId) => {
    this.deleteAct(actId)
  }

  onCharacterCreateFormSubmit = (character) => {
    this.createCharacter(this.state.play.id, character)
  }

  onCharacterDeleteClick = (characterId) => {
    this.deleteCharacter(characterId)
  }

  onDeleteClick = (playId) => {
    this.deletePlay(playId)
  }


  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  removeAct = (actId) => {
    let newActs = this.state.play.acts.filter(act => act.id !== actId)
    let sortedNewActs = this.sortActs(newActs)
    this.setState((prevState) => ({
      play: {
          ...prevState.play,
          acts: sortedNewActs,
        }
      })
    )
  }

  removeCharacter = (characterId) => {
    this.setState((prevState) => ({
      play: {
          ...prevState.play,
          characters: this.state.play.characters.filter(character => character.id !== characterId)
        }
      })
    )
  }

  sortActs = (acts) => {
    return acts.sort(function(a,b) {return (a.act_number > b.act_number) ? 1 : ((b.act_number > a.act_number) ? -1 : 0);} );
  }

  render () {
    if (this.state.toPlaysList === true) {
      return <Redirect to='/plays' />
    }
    if (this.state.play === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return(
        <PlayForm
          acts={this.sortActs(this.state.play.acts)}
          play={this.state.play}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
        />
      )
    }
    return (
      <PlayShow
        play={this.state.play}
        author={`${this.state.play.author.first_name} ${this.state.play.author.last_name}`}
        handleActCreateFormSubmit={this.onActCreateFormSubmit}
        handleActDeleteClick={this.onActDeleteClick}
        handleCharacterCreateFormSubmit={this.onCharacterCreateFormSubmit}
        handleCharacterDeleteClick={this.onCharacterDeleteClick}
        handleDeleteClick={this.onDeleteClick}
        handleEditClick={this.handleEditClick}
        onFormClose={this.handleFormClose}
        onFormSubmit={this.handleSubmit}
      />
    )
  }
}

EditablePlay.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
}

export default EditablePlay
