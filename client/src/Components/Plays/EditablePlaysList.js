import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditablePlay from './EditablePlay'

class EditablePlaysList extends Component {

  render () {
    const plays = this.props.plays.map((play) => (
      <li key={play.id}>
        <Link to={`/plays/${play.id}`}>{play.title}</Link>
      </li>
    ))
    return (
      <div id='plays'>
        <ul>
          {plays}
        </ul>
        <hr />
        <Route
          path={`/plays/:playId`}
          render={(props) => (
            <EditablePlay
              {...props}
              onDeleteClick={this.props.onDeleteClick}
              onFormSubmit={this.props.onFormSubmit}
            />
          )}
        />
      </div>
    )
  }
}

EditablePlaysList.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditablePlaysList
