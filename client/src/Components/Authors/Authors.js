import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import axios from 'axios'

import EditableAuthor from './AuthorShow'
import AuthorFormToggle from './AuthorFormToggle'

class Authors extends Component {

  state = {
    authors: [],
  }

  componentDidMount () {
    this.loadAuthorsFromServer() //loads authors and sets state authors array
  }

  addNewAuthor = (newAuthor) => {
    this.setState({
      authors: [...this.state.authors, newAuthor]
    })
  }

  createAuthor = (author) => {
    axios.post(
      '/api/authors',
      {
        author
      }
    )
    .then(response => {
      this.addNewAuthor(response.data)
    })
    .catch(error => console.log(error))

  }

  deleteAuthor = (authorId) => {
    axios.delete(`/api/authors/${authorId}`)
    .then(response => {
      this.setState({
        authors: this.state.authors.filter(a => a.id !== authorId),
      })
    })
    .catch(error => console.log(error))
    this.props.history.push('/authors')
  }

  loadAuthorsFromServer = () => {
    axios.get('/api/authors.json')
    .then(response => {
      this.setState({ authors: response.data })
    })
    .catch(error => console.log(error))
  }

  handleCreateFormSubmit = (author) => {
    this.createAuthor(author)
  }

  handleEditFormSubmit = (author) => {
    axios.put(`/api/authors/${author.id}`,
      {
        author: author
      },
    ).then((response) => {
      this.updateAuthor(response.data)
    })

  }

  handleDeleteClick = (authorId) => {
    this.deleteAuthor(authorId)
  }

  updateAuthor = (author) => {
    let newAuthors = this.state.authors.filter((a) => a.id !== author.id)
    newAuthors.push(author)
    this.setState({
      authors: newAuthors
    })
  }

  render () {
    return (
      <Row>
        <Col md={12} >
          <div>
            <h2>Authors</h2>
            <EditableAuthorsList
              authors={this.state.authors}
              onFormSubmit={this.handleEditFormSubmit}
              onDeleteClick={this.handleDeleteClick}
            />
            <AuthorFormToggle
              onFormSubmit={this.handleCreateFormSubmit}
              isOpen={false}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

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

export default Authors
