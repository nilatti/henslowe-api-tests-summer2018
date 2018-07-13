import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import React, { Component } from 'react'

import EditablePlaysList from './EditablePlaysList'
import PlayFormToggle from './PlayFormToggle'

class Plays extends Component {
  state = {
    plays: [],
  }

  componentDidMount () {
    this.loadPlaysFromServer() //loads authors and sets state authors array
  }

  addNewPlay = (newPlay) => {
    this.setState({
      plays: [...this.state.plays, newPlay]
    })
  }

  createPlay = (play) => {
    axios.post(
      '/api/plays',
      {
        play
      }
    )
    .then(response => {
      this.addNewPlay(response.data)
    })
    .catch(error => console.log(error))

  }

  deletePlay = (playId) => {
    axios.delete(`/api/plays/${playId}`)
    .then(response => {
      this.setState({
        plays: this.state.plays.filter(p => p.id !== playId),
      })
    })
    .catch(error => console.log(error))
    this.props.history.push('/plays')
  }

  loadPlaysFromServer = () => {
    axios.get('/api/plays.json')
    .then(response => {
      this.setState({ plays: response.data })
    })
    .catch(error => console.log(error))
  }

  handleCreateFormSubmit = (play) => {
    this.createPlay(play)
  }

  handleEditFormSubmit = (play) => {
    axios.put(`/api/plays/${play.id}`,
      {
        play: play
      },
    ).then((response) => {
      this.updatePlay(response.data)
    })

  }

  handleDeleteClick = (playId) => {
    this.deletePlay(playId)
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
          <div>
            <h2>Plays</h2>
            <EditablePlaysList
              plays={this.state.plays}
              onFormSubmit={this.handleEditFormSubmit}
              onDeleteClick={this.handleDeleteClick}
            />
            <PlayFormToggle
              onFormSubmit={this.handleCreateFormSubmit}
              isOpen={false}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default Plays
