import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditableTheater from './EditableTheater'

class EditableTheatersList extends Component {

  render () {
    const theaters = this.props.theaters.map((theater) => (
      <li key={theater.id}>
        <Link to={`/theaters/${theater.id}`}>{theater.name}</Link>
      </li>
    ))
    return (
      <div id='theaters'>
        <ul>
          {theaters}
        </ul>
        <hr />
        <Route
          path={`/theaters/:theaterId`}
          render={(props) => (
            <EditableTheater
              {...props}
              onDeleteClick={this.props.onDeleteClick} onFormSubmit={this.props.onFormSubmit}
              thisIsATestProp={true}
            />
          )}
        />
      </div>
    )
  }
}

EditableTheatersList.propTypes = {
  theaters: PropTypes.array.isRequired,
}

export default EditableTheatersList
