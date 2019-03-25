import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditableAuthor from './EditableAuthor'

class EditableAuthorsList extends Component {

  render () {
    return (
      <div id='authors'>
        <hr />
        <Route
          path={`/authors/:authorId`}
          render={(props) => (
            <EditableAuthor
              {...props}
              onDeleteClick={this.props.onDeleteClick} onFormSubmit={this.props.onFormSubmit}
            />
          )}
        />
      </div>
    )
  }
}

EditableAuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
}

export default EditableAuthorsList
