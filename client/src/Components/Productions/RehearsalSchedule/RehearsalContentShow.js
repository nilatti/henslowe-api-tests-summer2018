import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Row,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

class RehearsalContentShow extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {

    return (
      <Col md={12}>

        <Button onClick={this.props.handleEditClick}>Edit content</Button>
      </Col>
    )
  }
}

RehearsalContentShow.propTypes = {
  content: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func.isRequired
}

export default RehearsalContentShow
