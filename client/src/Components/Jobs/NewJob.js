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
    let production
    let productionSet
    let theater
    if (this.props.location.state){
      production = this.props.location.state.production
      productionSet = this.props.location.state.productionSet
      theater = this.props.location.state.theater
    } else {
      production = ''
      productionSet = false
      theater = ''
    }

    return (
      <Row>
        <Col md={12} >
          <div id="new-job-form">
            <JobForm
            production={production}
            productionSet={productionSet}
            theater={theater}
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
