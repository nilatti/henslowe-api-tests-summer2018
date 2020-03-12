import _ from 'lodash'
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  createItemWithParent,
  deleteItem,
  getItem,
  updateServerItem
} from '../../../api/crud'

import ConflictFormToggle from './ConflictFormToggle'
import EditableConflict from './EditableConflict'


class ConflictsList extends Component {
  constructor(props) {
    super(props)
    let conflicts = _.sortBy(this.props.user.conflicts, 'start_date')
    this.state = {
      conflicts: conflicts,
    }
  }

  handleConflictCreate = (conflict) => {
    this.createConflict(this.props.user.id, conflict)
  }

  handleConflictDelete = (conflictId) => {
    this.deleteConflict(conflictId)
  }

  async createConflict(userId, conflict) {
    const response = await createItemWithParent('user', userId, 'conflict', conflict)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating character'
      })
    } else {
      this.setState({
        conflicts: _.sortBy([...this.state.conflicts, response.data], 'start_date')
      })
    }
  }

  async deleteConflict(conflictId) {
    const response = await deleteItem(conflictId, 'conflict')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting conflict'
      })
    } else {
      this.setState({
        conflicts: this.state.conflicts.filter(conflict => conflict.id !== conflictId)
      })
    }
  }

  render(){
    if (this.state.conflicts === null) {
      return (
        <div>Loading conflicts</div>
      )
    }
    if (this.state.conflicts) {
      let conflicts = this.state.conflicts.map((conflict) =>
      <EditableConflict
      conflict={conflict}
      handleDeleteClick={this.handleConflictDelete}
      />
    )
    return(
      <Col>
      <Row>
      <h2>Conflicts</h2>
      </Row>
      <Row>
      {conflicts}
      </Row>
      <Row>
      <div>
      <ConflictFormToggle
      isOpen={false}
      onFormSubmit={this.handleConflictCreate}
      user={this.props.user}
      />
      </div>
      </Row>
      </Col>
    )
  } else {
    return (<div></div>)
  }
  }
}

ConflictsList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default ConflictsList
