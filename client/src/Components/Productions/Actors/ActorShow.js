import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
} from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'

import _ from 'lodash'

import ActorTrack from './ActorTrack'

class ActorShow extends Component {
  state ={
    showActorTrack: false,
  }

  toggleShowActorTrack = () => {
    this.setState({
      showActorTrack: !this.state.showActorTrack
    })
  }

  render() {
    return (
      <Col md={12}>
      <strong>{this.props.actorObj.actor.preferred_name || this.props.actorObj.actor.first_name} {this.props.actorObj.actor.last_name}:</strong> {_.join(this.props.actorObj.jobs.map(job => job.character.name), ', ')}
      <br />

      {
        this.state.showActorTrack
        ?
        <>
        <span onClick={this.toggleShowActorTrack}><em>(hide actor track)</em></span>
        <ActorTrack
          production={this.props.production}
          roles={this.props.actorObj.jobs}
        />
        </>
        :
        <span onClick={this.toggleShowActorTrack}><em>(show actor track)</em></span>
      }

      </Col>
    )
  }
}

ActorShow.propTypes = {
  actorObj: PropTypes.object.isRequired,
  production: PropTypes.object.isRequired,
}

export default ActorShow
