import React, {
  Component
} from 'react'
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Link,
  Route,
  Switch
} from 'react-router-dom'

import {
  createPlay,
  deletePlay
} from '../../api/plays'
import PlaysList from './PlaysList'
import EditablePlay from './EditablePlay'
import NewPlay from './NewPlay'

class Plays extends Component {

  async createPlay(play) {
    const response = await createPlay(play)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating play'
      })
    } else {
      this.props.history.push(`/plays/${response.data.id}`)
      window.location.reload();
    }
  }

  async deletePlay(playId) {
    const response = await deletePlay(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting Play'
      })
    } else {
      this.setState({
        plays: this.state.plays.filter(play =>
          play.id != playId
        )
      })
    }
  }

  handleCreateFormSubmit = (play) => {
    this.createPlay(play)
  }
  handleDeleteClick = (playId) => {
    this.deletePlay(playId)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="plays">
            <h2><Link to='/plays'>Plays</Link></h2>
            <hr />
              <Switch>
              <Route path='/plays/new' render={(props) => <NewPlay {...props} onFormSubmit={this.handleCreateFormSubmit}/> } />
              <Route
                path={`/plays/:playId`}
                render={(props) => (
                  <EditablePlay
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path='/plays/' component={PlaysList} />
              </Switch>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Plays