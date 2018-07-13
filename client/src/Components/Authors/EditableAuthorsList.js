import axios from 'axios'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import EditableAuthor from './AuthorShow'

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
          render={
            (props) =>
              <EditableAuthor
                {...props}
                onFormSubmit={this.props.onFormSubmit}
                onDeleteClick={this.props.onDeleteClick}
              />
              }
          />
      </div>
    )
  }
}

export default EditableAuthorsList
