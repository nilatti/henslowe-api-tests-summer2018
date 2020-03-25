import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

import {buildUserName} from '../../../utils/actorUtils'
import DraggableLists from '../../../utils/DraggableLists'

import {
  getPlayActOnStages,
  getPlayFrenchSceneOnStages,
  getPlayOnStages,
  getPlaySceneOnStages,
} from '../../../api/plays.js'

class RehearsalContentForm extends Component {
  constructor(props) {
    super(props)
    let hiredJobs = _.filter(this.props.production.jobs, function(o){ return o.specialization_id != 4})
    let hiredUsers = hiredJobs.map((job) => job.user)
    let availableUsers = this.availableUsers(hiredUsers, this.props.rehearsal)

    this.state={
      content: this.props.rehearsal.content || [],
      allUsers: hiredUsers,
      availableUsers: availableUsers,
      playContent: [],
    }
  }

  availableUsers(users, rehearsal) {
    let availableUsers = users.map((user) => {
      if (user.conflicts.length === 0) {
        return user
      } else {
        let conflicts_with_this_rehearsal = 0
        user.conflicts.map((conflict) => {
          if (conflict.start_time <= rehearsal.end_time && rehearsal.start_time <= conflict.end_time) {
            conflicts_with_this_rehearsal += 1
          }
        })
        if (conflicts_with_this_rehearsal <= 0) {
          return user
        }
      }
    })
    return availableUsers.filter(Boolean)
  }
  markContentRecommended() {
    let newPlayContent = this.state.playContent.map((content) => {
      if (content.hasOwnProperty('isRecommended')) {
        return content
      } else {
        return {...content, isRecommended: true}
      }
    })
    this.setState({
      playContent: newPlayContent
    })
  }

  markContentUserUnavailable(){
    let unavailableUsers = this.unavailableUsers(this.state.allUsers, this.props.rehearsal)
    let newPlayContent = this.state.playContent
    unavailableUsers.map((unavailableUser) => {
      newPlayContent = newPlayContent.map((item) => {
        let contentUsers = item.on_stages.map((on_stage) => on_stage.user_id)
        if (contentUsers.includes(unavailableUser.id)) {
          let reasonForRecommendation = ''
          if (item.reasonForRecommendation) { // tk add a thing t splice in and add more names if we have multiple "is not available"
            reasonForRecommendation += item.reasonForRecommendation
          }
          reasonForRecommendation += buildUserName(unavailableUser) + " is not available."
          return {...item, isRecommended: false, reasonForRecommendation: reasonForRecommendation}
        } else {
          return {...item, isRecommended: true}
        }
      })
    })
    this.setState({playContent: newPlayContent}, function() {this.markContentRecommended()})
  }

  unavailableUsers(users, rehearsal) {
    let unavailableUsers = users.map((user) => {
      if (user.conflicts.length === 0) {
        return
      } else {
        let conflicts_with_this_rehearsal = 0
        user.conflicts.map((conflict) => {
          if (conflict.start_time <= rehearsal.end_time && rehearsal.start_time <= conflict.end_time) {
            conflicts_with_this_rehearsal += 1
          }
        })
        if (conflicts_with_this_rehearsal > 0) {
          return user
        }
      }
    })
    return unavailableUsers.filter(Boolean)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleListChange = (listName, listContent) => {
    this.setState({
      [listName]: listContent
    })
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit()
      this.props.onFormClose()
    }
    this.setState({
      validated: true
    })
  }

  loadOnStages = (e) => {
    e.preventDefault()
    if (this.state.textUnit === 'french_scene') {
      this.loadFrenchSceneOnStages(263)
    } else if (this.state.textUnit === 'scene') {
      this.loadSceneOnStages(263)
    } else if (this.state.textUnit === 'act') {
      this.loadActOnStages(263)
    } else {
      this.loadPlayOnStages(263)
    }
  }

  processSubmit = () => {
    this.props.onFormSubmit({
      content: this.state.content,
      id: this.props.rehearsal.id,
    }, "rehearsal")
  }

  async loadActOnStages(playId) {
    const response = await getPlayActOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      this.setState({playContent: response.data}, function() {
        this.markContentUserUnavailable()
      })
    }
  }

  async loadFrenchSceneOnStages(playId) {
    const response = await getPlayFrenchSceneOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      this.setState({playContent: response.data}, function() {
        this.markContentUserUnavailable()
      })
    }
  }

  async loadPlayOnStages(playId) {
    const response = await getPlayOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      let playContent = response.data
      playContent['on_stages'] = playContent['find_on_stages']
      this.setState({playContent: playContent}, function() {
        this.markContentUserUnavailable()
      })
    }
  }

  async loadSceneOnStages(playId) {
    const response = await getPlaySceneOnStages(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving content'
      })
    } else {
      let playContent = response.data.map((scene) => {
        let prettyName = scene.pretty_name
        return {
          ...scene, heading: scene.pretty_name
        }
      })
      this.setState({playContent: playContent}, function() {
        this.markContentUserUnavailable()
      })
    }
  }

  render() {
    const {
      validated
    } = this.state
    if (this.state.playContent.length && this.state.playContent[0].hasOwnProperty('isRecommended')) {
      let listContents = [
        {
          listId: 'playContent',
          listContent: this.state.playContent,
          header: 'Don\'t rehearse in this session'
        },
        {
          header: 'Rehearse in this session',
          listId: 'content',
          listContent: this.state.content
        }
      ]
      return(
        <Col>
          <Row>
            <DraggableLists
              listContents={listContents}
              handleListChange={this.handleListChange}
            />
          </Row>
          <Row>
            <Button onClick={this.setContent}>Schedule this content</Button>
          </Row>
        </Col>

      )
    }
    return (
      <Col md={ {
          span: 8,
          offset: 2
        } }>
      <h2>How do you want to schedule this rehearsal?</h2>
      <Form
        onSubmit={e => this.loadOnStages(e)}
      >
      <Form.Group as={Form.Row}>
        <Form.Label as="legend">
          Unit of text
        </Form.Label>
        <Col sm={10} className="form-radio">
          <Form.Check
            checked={this.state.textUnit === 'french_scene'}
            id="french_scene"
            label="French Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="french_scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'scene'}
            id="scene"
            label="Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'act'}
            id="act"
            label="Act"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="act"
          />
          <Form.Check
            checked={this.state.textUnit === 'play'}
            id="play"
            label="Whole Play"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="play"
          />
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" block>Load Text Options</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
    </Form>
  </Col>
    )
  }
}

RehearsalContentForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.object.isRequired,
  rehearsal: PropTypes.object.isRequired,
}

export default RehearsalContentForm
