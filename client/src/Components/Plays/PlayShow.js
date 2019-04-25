import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Glyphicon,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import {
  BrowserRouter as Switch,
  Router,
  Route,
  Link
} from 'react-router-dom'

import ActFormToggle from './Acts/ActFormToggle'
import ActInfoTab from './Acts/ActInfoTab'
import Acts from './Acts/Acts'

import {
  createAct,
  deleteAct
} from '../../api/acts'


class PlayShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      acts: this.props.acts,
      key: ''
    };
  }

  async createAct(playId, act) {
    const response = await createAct(playId, act)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating act'
      })
    } else {
      this.setState({
        acts: [...this.state.acts, response.data]
      })
    }
  }

  async deleteAct(actId) {
    const response = await deleteAct(actId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting act'
      })
    } else {
      this.setState({
        acts: this.state.acts.filter(act =>
          act.id != actId
        )
      })
    }
  }

  handleActCreateClick = (act) => {
    this.createAct(this.props.id, act)
  }

  handleActDeleteClick = (actId) => {
    this.deleteAct(actId)
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    var actTabs = this.state.acts.map((act) =>
      <Tab eventKey={act.id} title={act.act_number} key={act.id}>
        <ActInfoTab act={act} />
      </Tab>
    )
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.title}</h2>
            by {this.props.author}
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <Glyphicon glyph="pencil" />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <Glyphicon glyph="glyphicon glyphicon-trash" />
            </span>
          </Col>
        </Row>
        <Row>
          <ActFormToggle play_id={this.props.id} onFormSubmit={this.handleActCreateClick} />
        </Row>
        <Row>
        <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="stop-info-tabs"
      >
        {actTabs}
      </Tabs>
          <Acts acts={this.state.acts} onDeleteClick={this.handleActDeleteClick} play_id={this.props.id} />
        </Row>
      </div>
    )
  }
}

PlayShow.propTypes = {
  acts: PropTypes.array.isRequired,
  author: PropTypes.string,
  characters: PropTypes.array.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleActCreateFormSubmit: PropTypes.func.isRequired,
  handleActDeleteClick: PropTypes.func.isRequired,
  handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default PlayShow