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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {
  createItemWithParent,
  deleteItem,
  getItem,
  updateServerItem
} from '../../../api/crud'

import EditableRehearsal from './EditableRehearsal'
import RehearsalFormToggle from './RehearsalFormToggle'

class ProductionRehearsalSchedule extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  componentDidMount() {
    const productionId = this.props.match.params.id
    this.loadProduction(productionId)
  }

  handleRehearsalCreate = (rehearsal) => {
    this.createRehearsal(this.props.match.params.id, rehearsal)
  }

  handleRehearsalDelete = (rehearsalId) => {
    this.deleteRehearsal(rehearsalId)
  }

  handleRehearsalEdit = (rehearsal) => {
    this.updateRehearsal(rehearsal)
  }

  async createRehearsal(productionId, rehearsal) {
    const response = await createItemWithParent('production', productionId, 'rehearsal', rehearsal)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating character'
      })
    } else {
      let newRehearsals = _.sortBy([...this.state.rehearsals, response.data], function(rehearsal) {
        return new Date(rehearsal.start_time);
      });
      this.setState({
        rehearsals: newRehearsals
      })
    }
  }

  async deleteRehearsal(rehearsalId) {
    const response = await deleteItem(rehearsalId, 'rehearsal')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting rehearsal'
      })
    } else {
      this.setState({
        rehearsals: this.state.rehearsals.filter(rehearsal => rehearsal.id !== rehearsalId)
      })
    }
  }

  async loadProduction(productionId) {
    const response = await getItem(productionId, 'production')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving production'
      })
    } else {
      let rehearsals = _.sortBy(response.data.rehearsals, function(rehearsal) {
        return new Date(rehearsal.start_time);
      });
      this.setState({
        production: {
          ...response.data,
          rehearsals: rehearsals
        }
      })
    }
  }


  async updateRehearsal(updatedRehearsal) {
    const response = await updateServerItem(updatedRehearsal, 'rehearsal')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating rehearsal'
      })
    } else {
      let newRehearsals = this.state.production.rehearsals.map((rehearsal) => {
        if (rehearsal.id === updatedRehearsal.id) {
          return {...rehearsal, ...updatedRehearsal}
        } else {
          return rehearsal
        }
      })
      this.setState({
        production: {
          ...this.state.production,
          rehearsals: newRehearsals
        }
      })
    }
  }

  render() {
    if (this.state.production) {
      let rehearsals = this.state.production.rehearsals.map((rehearsal) =>
        <EditableRehearsal
          handleDeleteClick={this.handleRehearsalDelete}
          handleSubmit={this.handleRehearsalEdit}
          key={rehearsal.id}
          production={this.state.production}
          rehearsal={rehearsal}
        />
      )
      return(
        <Col>
        {rehearsals}
        <Row>
          <RehearsalFormToggle
            isOpen={false}
            onFormSubmit={this.handleRehearsalCreate}
            production={this.state.production}
          />
        </Row>
        </Col>
      )
    }
    return <div>Loading rehearsal schedule</div>
  }
}

export default ProductionRehearsalSchedule
