import { createPlay, deletePlay, getPlays, updateServerPlay } from '../../api/plays'

import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import EditablePlaysList from './EditablePlaysList'
import PlayFormToggle from './PlayFormToggle'

class Plays extends Component {
  state = {
    plays: [],
    errorStatus: '',
    isVisible: true, //sets visibility for sidebar list
  }

  addNewPlay = (newPlay) => {
    this.setState({
      plays: [...this.state.plays, newPlay]
    })
  }

  componentDidMount () {
    this.loadPlaysFromServer()
  }

  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  async createPlay (play) {
    const response = await createPlay(play)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error creating play' })
    } else {
      console.log('play created')
      this.addNewPlay(response.data)
    }
  }

  async deletePlay (playId) {
    const response = await deletePlay(playId)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error deleting play' })
    } else {
      this.loadPlaysFromServer()
      this.props.history.push('/plays')
    }
  }

  async loadPlaysFromServer () {
    const response = await getPlays()
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching plays' })
    } else {
      this.setState({ plays: response.data })
    }
  }

  async updatePlayOnServer (play) {
    const response = await updateServerPlay(play)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error updating play'})
    } else {
      this.updatePlay(response.data)
    }
  }

  handleCreateFormSubmit = (play) => {
    this.createPlay(play)
  }

  handleDeleteClick = (playId) => {
    this.deletePlay(playId)
  }

  handleEditFormSubmit = (play) => {
    this.updatePlayOnServer(play)
    this.updatePlay(play)
  }

  updatePlay = (play) => {
    let newPlays = this.state.plays.filter((p) => p.id !== play.id)
    newPlays.push(play)
    this.setState({
      plays: newPlays
    })
  }

  render () {
    return (
    <Row>
      <Col md={12} >
        <div className='section-header'>
          <h2 className='internal-heading'>Plays</h2>
          <PlayFormToggle
            onFormSubmit={this.handleCreateFormSubmit}
            isOpen={false}
          />
        </div>
          <EditablePlaysList
            plays={this.state.plays}
            onFormSubmit={this.handleEditFormSubmit}
            onDeleteClick={this.handleDeleteClick}
          />

        </Col>
      </Row>
    )
  }
}

export default Plays
