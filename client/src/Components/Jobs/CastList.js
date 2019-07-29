import {
  uniqBy
} from 'lodash'

import {
  Link
} from 'react-router-dom'

import React, {
  Component
} from 'react'

import Select from 'react-select';

import {
  Button,
} from 'react-bootstrap'

import {
  Typeahead
} from 'react-bootstrap-typeahead';

import {
  createJob,
  deleteJob,
  getActorsAndAuditionersForProduction,
  getJobs,
  updateServerJob,
} from '../../api/jobs'

import CastingShow from './CastingShow'
import NewCasting from './NewCasting'

class CastList extends Component {
  state = {
    availableActors: [],
    castings: [],
    newCastingFormOpen: false,
  }

  componentDidMount() {
    this.loadCastingsFromServer()
    this.loadActorsAndAuditionersFromServer()
  }

  async createJobOnServer(casting) {
    const response = await createJob(casting)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating casting'
      })
    } else {
      this.setState({
        castings: [...this.state.castings, response.data]
      })
    }
  }

  async deleteCasting(castingId) {
    const response = await deleteJob(castingId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting casting'
      })
    } else {
      this.setState({
        castings: this.state.castings.filter(casting =>
          casting.id !== castingId
        )
      })
    }
  }

async loadActorsAndAuditionersFromServer(){
    const response = await getActorsAndAuditionersForProduction(this.props.production.id)
    if (response.status >= 400) {
      console.log('Error fetching actors and auditioners')
      this.setState({
        errorStatus: 'Error fetching actors and auditioners'
      })
    } else {
      this.setState({
        availableActors: uniqBy(response.data.map(item => item.user), 'id')
      })
    }
  }

  async loadCastingsFromServer() {
   const response = await getJobs(
     {
       production_id: this.props.production.id,
       specialization_id: 2,  //I don't like the id that goes with the actor job being hardcoded here, but I'm not sure how to do it otherwise.
     })

    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching castings',
      })
    } else {
      let legalCastings = response.data.filter(obj => obj.character !== undefined)
      this.setState({
        castings: legalCastings.map(obj=> ({ ...obj, editOpen: false })),
      })
    }
  }

  handleActorClick(castingId) {
    this.setState({
      castings: this.state.castings.map(casting => {
        if (casting.id === castingId) {
          return { ...casting, editOpen: !casting.editOpen };
        } else {
          return casting;
        }
      })
    })
  }

  handleButtonClick = () => {
    this.setState({
      newCastingFormOpen: true,
    })
  }

  handleFormClose = () => {
    this.setState({
      newCastingFormOpen: false,
    })
  }
  handleFormSubmit = (casting) => {
    this.createJobOnServer(casting)
  }

  onDeleteClick = (castingId) => {
    this.deleteCasting(castingId)
  }

  render() {
    let availableActors = this.state.availableActors.map(actor => ({
      id: actor.id,
      label: `${actor.preferred_name || actor.first_name} ${actor.last_name}`
    }))
    availableActors.unshift({value: null, label: ''})
    let castings = this.state.castings.map(casting =>
      <li
        key={casting.id}
      >
        <CastingShow
          availableActors={availableActors}
          casting={casting}
          onDeleteClick={this.onDeleteClick}
        />
      </li>
    )
    return (
      <div>
        <ul>
          {castings}
        </ul>
        {
          this.state.newCastingFormOpen ?
          <NewCasting
            onFormClose={this.handleFormClose}
            onFormSubmit={this.handleFormSubmit}
            production={this.props.production}
            users={availableActors}
          />
          :
          <Button
            onClick={this.handleButtonClick}
            variant="success"
          >
            Add Casting
          </Button>
        }

      </div>
    )
  }
}

export default CastList
