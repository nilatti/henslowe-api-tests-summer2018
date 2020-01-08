import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'

class LineShow extends Component {
  state={
    line: this.props.line
  }
  render() {
    let line = this.state.line
    let words = line.words.map(word => word.content)
    return (
      <Row>
        <Col md={12} >
          <div id={line.number}>
            {words}
          </div>
        </Col>
      </Row>
    )
  }
}

LineShow.propTypes = {
  line: PropTypes.object.isRequired
}

export default LineShow
