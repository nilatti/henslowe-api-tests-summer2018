import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import {
  Link,
} from 'react-router-dom'

import ActFormToggle from './Acts/ActFormToggle'
import ActInfoTab from './Acts/ActInfoTab'

import CharacterFormToggle from './Characters/CharacterFormToggle'
import CharacterInfoTab from './Characters/CharacterInfoTab'

import {
  createAct,
  deleteAct,
  updateServerAct,
} from '../../api/acts'

import {
  createCharacter,
  deleteCharacter,
  updateServerCharacter,
} from '../../api/characters'


class PlayShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      acts: this.props.play.acts,
      characters: this.props.play.characters,
      key: ''
    };
  }

  async createAct(playId, act) {
    const response = await createAct(playId, act)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating act'
      })
    } else {
      this.setState({
        acts: [...this.state.acts, response.data].sort((a, b) => (a.number - b.number)),
        key: response.data.id,
      })
    }
  }

  async deleteAct(actId) {
    const response = await deleteAct(actId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting act'
      })
    } else {
      this.setState({
        acts: this.state.acts.filter(act =>
          act.id !== actId
        )
      })
    }
  }

  async updateServerAct(actAttrs) {
    const response = await updateServerAct(actAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating act'
      })
    } else {
      this.setState(state => {
        const actList = state.acts.map((act) => {
          if (act.id === actAttrs.id) {
            return actAttrs
          } else {
            return act
          }
        })
        return {
          acts: actList
        }
      })
    }
  }

  async createCharacter(playId, character) {
    const response = await createCharacter(playId, character)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating character'
      })
    } else {
      this.setState({
        characters: [...this.state.characters, response.data].sort((a, b) => (a.name > b.name) - (a.name < b.name))
      })
    }
  }

  async deleteCharacter(characterId) {
    const response = await deleteCharacter(characterId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting character'
      })
    } else {
      this.setState({
        characters: this.state.characters.filter(character =>
          character.id !== characterId
        )
      })
    }
  }

  async updateServerCharacter(characterAttrs) {
    const response = await updateServerCharacter(characterAttrs)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating character'
      })
    } else {
      this.setState(state => {
        const characterList = state.characters.map((character) => {
          if (character.id === characterAttrs.id) {
            return characterAttrs
          } else {
            return character
          }
        })
        return {
          characters: characterList
        }
      })
    }
  }

  handleActCreateClick = (act) => {
    this.createAct(this.props.play.id, act)
  }

  handleActDeleteClick = (actId) => {
    this.deleteAct(actId)
  }

  handleEditActSubmit = (act) => {
    this.updateServerAct(act)
  }

  handleCharacterCreateClick = (character) => {
    this.createCharacter(this.props.play.id, character)
  }

  handleCharacterDeleteClick = (characterId) => {
    this.deleteCharacter(characterId)
  }

  handleEditCharacterSubmit = (character) => {
    this.updateServerCharacter(character)
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.play.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let actTabs
    let characterTabs
    if (this.state.acts[0]) {
      actTabs = this.state.acts.map((act) =>
        <Tab eventKey={`act-${act.id}`} title={`Act ${act.number}`} key={`act-${act.id}`}>
        <ActInfoTab act={act} play_id={this.props.play.id} onDeleteClick={this.handleActDeleteClick} handleEditSubmit={this.handleEditActSubmit}/>
      </Tab>
      )
    } else {
      actTabs = <div>No acts found</div>
    }
    if (this.state.characters[0]) {
      characterTabs = this.state.characters.map((character) =>
        <Tab eventKey={`character-${character.id}`} title={`${character.name}`} key={`character-${character.id}`}>
        <CharacterInfoTab character={character} play_id={this.props.play.id} onDeleteClick={this.handleCharacterDeleteClick} handleEditSubmit={this.handleEditCharacterSubmit}/>
      </Tab>
      )
    } else {
      characterTabs = <div>No acts found</div>
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.play.title}</h2>
            a {this.props.play.genre.join('/')}<br />
            {this.props.play.canonical ? <p><em> Canonical Version</em></p> : <p></p>}
            by <Link to={`/authors/${this.props.play.author.id}`}> {this.props.play.author.first_name} {this.props.play.author.last_name}</Link><br />
            {this.props.play.date}<br />
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <i className="fas fa-pencil-alt"></i>
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </Col>
        </Row>
        <Row>
          <h2>Characters</h2>
        </Row>
        <Row>
          <CharacterFormToggle play_id={this.props.play.id} isOpen={false} onFormSubmit={this.handleCharacterCreateClick} />
        </Row>
        <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="character-info-tabs"
      >
        {characterTabs}
      </Tabs>
        <Row>
        <h2>Acts</h2>
        </Row>
        <Row>
          <ActFormToggle play_id={this.props.play.id} isOpen={false} onFormSubmit={this.handleActCreateClick} />
        </Row>
        <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="act-info-tabs"
      >
        {actTabs}
      </Tabs>
      </div>
    )
  }
}

PlayShow.propTypes = {
  handleActCreateFormSubmit: PropTypes.func.isRequired,
  handleActDeleteClick: PropTypes.func.isRequired,
  handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default PlayShow
