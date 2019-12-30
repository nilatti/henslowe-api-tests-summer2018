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

class PlayScripts extends Component {
  state={
    lines: []
  }

  componentWillMount() {
    const { playId } = this.props.match.params.id
    console.log('play Id is', this.props.match.params.id)
    this.loadLines(playId)
  }

  async loadLines(playId) {
    const response = await getItemsWithParent('play', playId, 'lines')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving play'
      })
    } else {
      this.updateState({lines: response.data})
    }
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="play_script">
            <h2>This is a play script</h2>
          </div>
        </Col>
      </Row>
    )
  }
}

export default PlayScripts
