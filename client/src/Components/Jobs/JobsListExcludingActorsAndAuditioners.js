import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import _ from 'lodash'

class JobsListExcludingActorsAndAuditioners extends Component {
  excludeActorsAndAuditioners() {
    return this.props.production.jobs.filter(job => job.specialization.title !== 'Actor' && job.specialization.title !== 'Auditioner')
  }
  render() {
    let productionSet = this.props.production !== undefined ? true : false
    let jobs = this.excludeActorsAndAuditioners().map(job =>
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

JobsListExcludingActorsAndAuditioners.propTypes = {
  production: PropTypes.object.isRequired,
}

export default JobsListExcludingActorsAndAuditioners
