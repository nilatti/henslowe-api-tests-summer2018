import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Glyphicon, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link, Redirect } from 'react-router-dom'

import { deleteItem, getItem } from '../../../api/crud'

import ActShow from './ActShow'
import ActForm from './ActForm'

class EditableAct extends Component {
  constructor(props){
    super(props)
    this.state = {
      editFormOpen: false,
      act: null,
    }
  }
  closeForm = () => {
    this.setState({ editFormOpen: false })
  }

  componentDidMount = () => {
      this.loadActFromServer(this.props.match.params.actId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.act === null || prevProps.match.params.actId !== this.props.match.params.actId) {
      this.loadActFromServer(this.props.match.params.actId);
    }
  }

  async loadActFromServer (actId) {
    const response = await getItem(actId, "act")
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching act' })
    } else {
      this.setState({ act: response.data })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        act: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  onEditClick = () => {
    this.openForm()
  }

  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (act) => {
    this.props.onFormSubmit(act)
    this.closeForm()
  }

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  render () {
    if (this.state.editFormOpen) {
      return(
        <ActForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
        />
      )
    }
    if (this.state.act === null) {
      return (
        <div>Loading!</div>
      )
    }
    return (
      <ActShow
        act={this.state.act}
        handleDeleteClick={this.props.onDeleteClick}
        handleEditClick={this.onEditClick}
      />
    )
  }
}

EditableAct.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
}

export default EditableAct
