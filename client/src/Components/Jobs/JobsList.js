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
  state = {
    jobs: [],
  }

  componentDidMount() {
    this.loadJobsFromServer()
  }

  async loadJobsFromServer() {
   const response = await getJobs(
     {
       production_id: this.props.production_id,
       specialization_id: this.props.specialiation_id,
       theater_id: this.props.theater_id,
       user_id: this.props.user_id})

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
        <Link to='/jobs/new'>Add New</Link>
      </div>
    )
  }
}

export default JobsList
