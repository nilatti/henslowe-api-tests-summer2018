import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import Moment from 'react-moment';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {
  getItemsWithParent,
  updateServerItem
} from '../../../api/crud'

class RehearsalShow extends Component {
  constructor(props) {
    super(props)
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.rehearsal.id)
  }

  render() {
    let rehearsal = this.props.rehearsal
    return(
      <Col md={8}>
        <Row>
        <Moment format="h:mm MMM D, YYYY">
          {rehearsal.start_time}
        </Moment>
        -
        <Moment format="h:mm MMM D, YYYY">
          {rehearsal.end_time}
        </Moment>: {rehearsal.title}
        {
          rehearsal.space_id
          ?
          <span>at {rehearsal.space_id}</span>
          :
          <span></span>
        }
        <span
                      className='right floated edit icon'
                      onClick={this.props.handleEditClick}
                    >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className='right floated trash icon'
            onClick={this.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </Row>
        {
          rehearsal.notes
          ?
          <Row>
            {rehearsal.notes}
          </Row>
          :
          <span></span>
        }
        <hr />
      </Col>

    )
  }
}

RehearsalShow.propTypes = {
  rehearsal: PropTypes.object.isRequired,
}

export default RehearsalShow