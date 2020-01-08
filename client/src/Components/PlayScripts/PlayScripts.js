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
  Switch,
} from 'react-router-dom'

import {
  getItemsWithParent,
  updateServerItem
} from '../../api/crud'

import {
  getPlayScript
} from '../../api/plays'

import Act from './Act'
import LineShow from './LineShow'

class PlayScripts extends Component {
  state={
    play: []
  }

  componentDidMount() {
    const { playId } = this.props.match.params.id
    this.loadLines(playId)
  }

  async loadLines(playId) {
    const response = await getPlayScript(this.props.match.params.id)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving play'
      })
    } else {
      this.setState({play: response.data})
    }
  }

  render() {
    let acts
    if (this.state.play.acts) {
      acts = this.state.play.acts.map(act =>
        <Act act={act} key={act.number}/>
      )
    } else {
      acts = <div>Loading acts</div>
    }

    return (
    <Col>
      <Row>
        <Col md={12} >
          <div id="play_script">
            <h2>{this.state.play.title}</h2>
          </div>
        </Col>
      </Row>
      <Col>
        {acts}
      </Col>
    </Col>
    )
  }
}

export default PlayScripts
