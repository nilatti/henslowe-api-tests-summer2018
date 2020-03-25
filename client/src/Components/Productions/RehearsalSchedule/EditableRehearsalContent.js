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

import RehearsalContentForm from './RehearsalContentForm'
import RehearsalContentShow from './RehearsalContentShow'

class EditableRehearsalContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
    }
  }

  handleEditClick = () => {
    this.toggleForm()
  }
  handleSubmit = (conflict) => {
    this.props.handleSubmit(conflict)
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
      let content = _.concat(this.props.rehearsal.acts, this.props.rehearsal.scenes, this.props.rehearsal.french_scenes)
      content = content.map((item) => {
        if (item.heading) {
          return item
        } else {
          item.heading = item.pretty_name
          return item
        }
      })
      if (this.state.editFormOpen) {
        return (
          <RehearsalContentForm
            content={content}
            rehearsal={this.props.rehearsal}
            isOpen={this.state.editFormOpen}
            onFormSubmit={this.handleSubmit}
            onFormClose={this.toggleForm}
            production={this.props.production}
          />
        )
      } else {
        return (
          <RehearsalContentShow
            content={content}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.props.handleDeleteClick}
            onFormSubmit={this.handleSubmit}
          />
        )
      }
  }
}

EditableRehearsalContent.propTypes = {
  rehearsal: PropTypes.object.isRequired,
}

export default EditableRehearsalContent
