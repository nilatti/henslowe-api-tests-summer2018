import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import JobForm from './JobForm'

class NewJob extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (job) => {
    this.handleFormClose()
    this.props.onFormSubmit(job)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="new-job-form">
            <JobForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewJob.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewJob
