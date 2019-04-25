import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Glyphicon,
  Row,
  Col
} from 'react-bootstrap'
import {
  BrowserRouter as Switch,
  Router,
  Route,
  Link
} from 'react-router-dom'

class ActShow extends Component {
  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.act.id)
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.act.act_number}</h2>
            <p>
              {this.props.act.summary}
            </p>
            
          </Col>
        </Row>
        <Row>
          <p>
            {this.props.summary}
          </p>
        </Row>
      </div>
    )
  }
}

ActShow.propTypes = {
  act: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}

export default ActShow