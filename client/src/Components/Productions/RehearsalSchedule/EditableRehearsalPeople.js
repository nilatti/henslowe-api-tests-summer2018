import _ from 'lodash'
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

import RehearsalPeopleForm from './RehearsalPeopleForm'
import RehearsalPeopleShow from './RehearsalPeopleShow'

class EditableRehearsalPeople extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
    }
  }

  handleEditClick = () => {
    this.toggleForm()
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
      if (this.props.rehearsal === null) {
        return (
          <div>Loading!</div>
        )
      }
      if (this.state.editFormOpen) {
        return (
          <RehearsalPeopleForm
            hiredUsers={this.props.hiredUsers}
            rehearsal={this.props.rehearsal}
            isOpen={this.state.editFormOpen}
            onFormSubmit={this.props.onFormSubmit}
            onFormClose={this.toggleForm}
          />
        )
      } else {
        return (
          <RehearsalPeopleShow
            handleEditClick={this.handleEditClick}
            users={this.props.rehearsal.users}
          />
        )
      }
  }
}

EditableRehearsalPeople.propTypes = {
  hiredUsers: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  rehearsal: PropTypes.object.isRequired,
}

export default EditableRehearsalPeople
