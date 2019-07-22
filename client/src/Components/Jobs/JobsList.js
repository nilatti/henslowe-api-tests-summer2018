import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getJobs,
} from '../../api/jobs'

class JobsList extends Component {
  constructor(props) {
    super(props)
    let production
    let specialization
    let theater
    let user
    if (this.props.production) {
      production = this.props.production
      theater = this.props.production.theater
    }
    if (this.props.specialization_id) {
      specialization = this.props.specialization_id
    }

    if (this.props.theater) {
      theater = this.props.theater
    }

    if (this.props.user_id) {
      user = this.props.user_id
    }

    this.state = {
      jobs: [],
      production: production,
      theater: theater,
      specialization_id: specialization,
      user: user
    }
  }

  componentDidMount() {
    this.loadJobsFromServer()
  }

  async loadJobsFromServer() {
    let production_id = this.props.production ? this.props.production.id : ''
    let specialization_id = this.props.specialization_id ? this.props.specialization_id : ''
    let theater_id = this.props.theater ? this.props.theater.id : ''
    let user_id = this.props.user_id ? this.props.user_id : ''
   const response = await getJobs(
     {
       production_id: production_id,
       specialization_id: specialization_id,
       theater_id: theater_id,
       user_id: user_id
      }
    )

    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching jobs'
      })
    } else {
      this.setState({
        jobs: response.data
      })
    }
  }

  render() {
    let productionSet = this.props.production !== undefined ? true : false
    let jobs = this.state.jobs.map(job =>
      <li key={job.id}>
        <Link to={`/jobs/${job.id}`}>
          {job.user ? job.user.preferred_name || job.user.first_name : ''} {job.user ? job.user.last_name : ''}
          : {job.specialization.title} at {job.theater.name}
        </Link>
      </li>
    )
    return (
      <div>
        <ul>
          {jobs}
        </ul>
        <Link
          to={{
            pathname: '/jobs/new',
            state: {
              production: this.props.production,
              productionSet: productionSet,
              theater: this.props.theater,
            }
          }}
        >
          Add New
        </Link>
      </div>
    )
  }
}

JobsList.propTypes = {
  // production: PropTypes.object.isRequired,
}

export default JobsList
