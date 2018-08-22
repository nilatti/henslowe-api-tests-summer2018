import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditableAct from './EditableAct'

class EditableActsList extends Component {

  render () {
    const play_id = this.props.play_id
    const acts = this.props.acts.map((act) => (
      <li key={act.id}>
        <Link to={`acts/${act.id}`}>{act.act_number}</Link>
      </li>
    ))
    //
    return (
      <div id='acts'>
        <ul>
          {acts}
        </ul>
        <hr />
        <Route
          path={`acts/:actId`}
          render={(props) => (
            <EditableAct
              {...props}
              play_id={this.props.play_id}
              onDeleteClick={this.props.onDeleteClick}
              onFormSubmit={this.props.onFormSubmit}
            />
          )}
        />
      </div>
    )
  }
}

EditableActsList.propTypes = {
  acts: PropTypes.array.isRequired,
  play_id: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditableActsList
