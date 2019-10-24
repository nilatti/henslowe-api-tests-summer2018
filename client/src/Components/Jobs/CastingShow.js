import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'


import {
  Button,
  Form
} from 'react-bootstrap'

import {
  Typeahead
} from 'react-bootstrap-typeahead';

import {
  updateServerJob,
} from '../../api/jobs'

import {buildUserName} from '../../utils/actorUtils'

class CastingShow extends Component {
  constructor(props) {
    super(props)
    let selectedUser
    if (this.props.casting.user) {
      selectedUser = [{id: this.props.casting.user.id, label: buildUserName(this.props.casting.user) }]
    } else {
      selectedUser = []
    }
    this.state={
      editOpen: false,
      selectedUser: selectedUser
    }
  }

  async updateJobOnServer(actorId) {
    let newCasting = {...this.props.casting, user_id: actorId}
    const response = await updateServerJob(newCasting)

    if (response >= 400) {
      this.setState({
        errorStatus: 'Error writing casting to server'
      })
    } else {
    }
  }

  formToggle() {
    this.setState({
      editOpen: !this.state.editOpen
    })
  }

  handleChangeUser = (e) => {
    if (e.length > 0) {
      this.setState({
        editOpen: false,
        selectedUser: [e[0]]
      })
      this.updateJobOnServer(e[0].id, this.props.casting.id)
    }
  }

  handleEditClick() {
    this.formToggle()
  }

  handleFormClose = () => {
    this.setState({
      newCastingFormOpen: false,
    })
  }

  onDeleteClick = (castingId) => {
    this.deleteCasting(castingId)
  }

  render() {
    return (
      <div>
      {
        this.state.editOpen
        ?
        <Form>
          <Form.Group>
            <Form.Label>
              {this.props.casting.character.name}
            </Form.Label>
            <Typeahead
              id="user"
              options={this.props.availableActors}
              onChange={(selected) => {
                this.handleChangeUser(selected)
              }}
              selected={this.state.selectedUser}
              placeholder="Choose actor"
            />
            <Form.Control.Feedback type="invalid">
                User is required
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        :
        <span><span
          onClick={() => this.handleEditClick()}
        >
          {this.state.selectedUser.length > 0 ? this.state.selectedUser[0].label : <strong>Click to cast</strong>}: {this.props.casting.character.name}</span>
          <span className='right floated trash icon'
          onClick={() => this.props.onDeleteClick(this.props.casting.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
        </span>
      }
      </div>
    )
  }
}

CastingShow.propTypes = {
  availableActors: PropTypes.array.isRequired,
  casting: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default CastingShow