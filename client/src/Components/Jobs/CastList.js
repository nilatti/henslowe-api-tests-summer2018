import {
  Link
} from 'react-router-dom'
import React, {
  Component
} from 'react'

import {
  Typeahead
} from 'react-bootstrap-typeahead';

import {
  getJobs,
} from '../../api/jobs'

class CastList extends Component {
  state = {
    jobs: [],
  }

  componentDidMount() {
    this.loadJobsFromServer()
  }

  async loadJobsFromServer() {
   const response = await getJobs(
     {
       production_id: this.props.production_id
     })

    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching jobs',
      })
    } else {
      this.setState({
        jobs: response.data.map(obj=> ({ ...obj, editOpen: false })),
      })
    }
  }

  handleActorClick(jobId) {
    this.setState({
      jobs: this.state.jobs.map(job => {
        if (job.id === jobId) {
          return { ...job, editOpen: !job.editOpen };
        } else {
          return job;
        }
      })
    })
  }

  render() {
    let jobs = this.state.jobs.map(job =>
      <li
        key={job.id}
        indexkey={job.id}
        onClick={() => this.handleActorClick(job.id)}
      >
        { job.editOpen
          ?
          <span>TK Typeahead of actor names goes here</span>
          :
          <span>{job.user ? job.user.preferred_name || job.user.first_name : ''} {job.user ? job.user.last_name : ''}: {job.character.name}</span>
        }
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

export default CastList
