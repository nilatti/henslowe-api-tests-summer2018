import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditableAuthor from './EditableAuthor'

class EditableAuthorsList extends Component {

  render () {
    const authors = this.props.authors.map((author) => (
      <li key={author.id}>
        <Link to={`/authors/${author.id}`}>{author.first_name} {author.middle_name} {author.last_name}</Link>
      </li>
    ))
    return (
      <div id='authors'>
        <ul>
          {authors}
        </ul>
        <hr />
        <Route
          path={`/authors/:authorId`}
          render={(props) => (
            <EditableAuthor
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

EditableAuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default EditableAuthorsList
