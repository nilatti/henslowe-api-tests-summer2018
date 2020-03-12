import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  updateServerUser
} from '../../api/users.js'

import JobsList from '../Jobs/JobsList'
import ConflictsList from './Conflicts/ConflictsList'

class UserShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.user.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {

    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="user-profile">
          <h2>{this.props.user.preferred_name || this.props.user.first_name} {this.props.user.last_name}</h2>
          <p>
            <a href={`mailto:${this.props.user.email}`}>{this.props.user.email}</a><br />
            <a href={this.props.user.website}>{this.props.user.website}</a>
          </p>

          <p>
            {this.props.user.phone_number}<br />
            {this.props.user.street_address}<br />
            {this.props.user.city}, {this.props.user.state}  {this.props.user.zip}<br />
          </p>
          <p>
            <strong>First name:</strong> {this.props.user.first_name}<br />
            <strong>Middle name:</strong> {this.props.user.middle_name}<br />
            <strong>Preferred name:</strong> {this.props.user.preferred_name}<br />
            <strong>Last name:</strong> {this.props.user.last_name}<br />
            <strong>Name for programs:</strong> {this.props.user.program_name}<br />
          </p>
          <p>
            <strong>Date of Birth:</strong> <Moment format="MMMM Do, YYYY">{this.props.user.birthdate}</Moment><br />
            <strong>Gender:</strong> {this.props.user.gender}<br />
            <strong>Description:</strong> {this.props.user.description}<br />
            <strong>Bio:</strong> {this.props.user.bio}<br />
          </p>
          <p>
            <strong>Timezone:</strong> {this.props.user.timezone}
          </p>
          <p>
            <strong>Emergency Contact:</strong> {this.props.user.emergency_contact_name}, {this.props.user.emergency_contact_number}
          </p>
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
          >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className='right floated trash icon'
            onClick={this.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </Col>
      </Row>
      <hr />
      <Row>
        <ConflictsList user={this.props.user} />
      </Row>
      <hr />
      <Row>
        <JobsList user={this.props.user} />
      </Row>
      </Col>
    )
  }
}

UserShow.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default UserShow
