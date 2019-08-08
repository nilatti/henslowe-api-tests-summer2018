import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button, Form} from 'react-bootstrap'

import {Typeahead} from 'react-bootstrap-typeahead'

import { RIEInput, RIENumber, RIESelect, RIETextArea, RIEToggle} from '@attently/riek'
import _ from 'lodash'

class EntranceExitShow extends Component {
  state = {
    categoryFormOpen: false,
    category: this.props.entranceExit.category,
    characterFormOpen: false,
    selectedCharacter: [{id: this.props.entranceExit.character.id, label: this.props.entranceExit.character.name}],
    stageExitFormOpen: false,
    selectedStageExit: [{id: this.props.entranceExit.stage_exit.id, label: this.props.entranceExit.stage_exit.name}]
  }

  handleCategoryBlur = (selected, entranceExitId) => {
    this.toggleCategoryForm()
    this.props.onSave({"category": this.state.category}, entranceExitId)
  }

  handleCategoryClick = () => {
    this.toggleCategoryForm()
  }

  handleChangeCategory = (event) => {
    this.setState({category: event.target.value})
  }

  toggleCategoryForm = () => {
    this.setState({categoryFormOpen: !this.state.categoryFormOpen})
  }

  handleCharacterBlur = (selected, entranceExitId) => {
    this.toggleCharacterForm()
    this.props.onSave({"character_id": this.state.selectedCharacter[0].id, "character_name": this.state.selectedCharacter[0].label}, entranceExitId)
  }

  handleCharacterClick = () => {
    this.toggleCharacterForm()
  }

  handleChangeCharacter = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacter: [e[0]]
      })
    }
  }

  toggleCharacterForm = () => {
    this.setState({characterFormOpen: !this.state.characterFormOpen})
  }

  handleStageExitBlur = (selected, entranceExitId) => {
    this.toggleStageExitForm()
    this.props.onSave({"stage_exit_id": this.state.selectedStageExit[0].id, "stage_exit_name": this.state.selectedStageExit[0].label}, entranceExitId)
  }

  handleStageExitClick = () => {
    this.toggleStageExitForm()
  }

  handleChangeStageExit = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedStageExit: [e[0]]
      })
    }
  }

  toggleStageExitForm = () => {
    this.setState({stageExitFormOpen: !this.state.stageExitFormOpen})
  }

  render() {
    const entranceExit = this.props.entranceExit
    var characters = this.props.characters.map((character) => ({
      id: character.id,
      label: String(character.name)
    }))
    var stageExits = this.props.stageExits.map((stageExit) => ({
      id: stageExit.id,
      label: String(stageExit.name)
    }))
    return (
      <span>
      Line:&nbsp;&nbsp;
        <RIENumber
          value={entranceExit.line}
          change={(selected) => this.props.onSave(selected, entranceExit.id)}
          propName='line'
        />
      , Page:&nbsp;&nbsp;
        <RIENumber
          value={entranceExit.page}
          change={(selected) => this.props.onSave(selected, entranceExit.id)}
          propName='page'
        />&nbsp;&nbsp;
        {
          this.state.categoryFormOpen
          ?
          <Form>
            <Form.Group controlId="category">
              <Form.Label>Enter or Exit?</Form.Label>
              <Form.Control
                as="select"
                onBlur={(selected) => {
                  this.handleCategoryBlur(selected, entranceExit.id)
                }}
                onChange={this.handleChangeCategory}
                value={this.state.category}
              >
                <option value="Enter">Enter</option>
                <option value="Exit">Exit</option>
              </Form.Control>
            </Form.Group>
          </Form>
          :
          <span>
            <span onDoubleClick={this.handleCategoryClick}>
              {entranceExit.category}
            </span>
          </span>
        }&nbsp;&nbsp;
        {
          this.state.stageExitFormOpen
          ?
          <Form>
            <Form.Group>
              <Form.Label>
                Stage Exit
              </Form.Label>
              <Typeahead
                id="stage_exit"
                required
                options={stageExits}
                onBlur={(selected) => {
                  this.handleStageExitBlur(selected, entranceExit.id)
                }}
                onChange={(selected) => {
                  this.handleChangeStageExit(selected)
                }}
                selected={this.state.selectedStageExit}
                placeholder="Choose the exit"
              />
              <Form.Control.Feedback type="invalid">
                  Stage Exit is required
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          :
          <span>
            <span onDoubleClick={this.handleStageExitClick}>
              {this.state.selectedStageExit[0].label
            }</span><br />
          </span>
        }&nbsp;&nbsp;
        {
          this.state.characterFormOpen
          ?
          <Form>
            <Form.Group>
              <Form.Label>
                Character
              </Form.Label>
              <Typeahead
                id="character"
                required
                options={characters}
                onBlur={(selected) => {
                  this.handleCharacterBlur(selected, entranceExit.id)
                }}
                onChange={(selected) => {
                  this.handleChangeCharacter(selected)
                }}
                selected={this.state.selectedCharacter}
                placeholder="Choose the character"
              />
              <Form.Control.Feedback type="invalid">
                  Character is required
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          :
          <span>
            <span onDoubleClick={this.handleCharacterClick}>
              as {this.state.selectedCharacter[0].label
            }</span><br />
          </span>
        }
&nbsp;&nbsp;
        Notes: <RIETextArea
          value={entranceExit.notes}
          change={(selected) => this.props.onSave(selected, entranceExit.id)}
          propName="notes"
        />

      <span className='right floated trash icon'
        onClick={() => this.props.onDeleteClick(entranceExit.id)}
      >
        <i className="fas fa-trash-alt"></i>
      </span>
    </span>
    )
  }
}

EntranceExitShow.propTypes = {
  characters: PropTypes.array.isRequired,
  entranceExit: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  stageExits: PropTypes.array.isRequired,
}

export default EntranceExitShow
