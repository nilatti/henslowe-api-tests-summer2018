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

class UserShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id)
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
          <h2>{this.props.user.first_name}</h2>
          <p>{this.props.user.email}</p>
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
      </Col>
    )
  }
}

export default UserShow
