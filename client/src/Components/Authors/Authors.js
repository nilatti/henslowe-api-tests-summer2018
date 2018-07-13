import axios from 'axios'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import AuthorFormToggle from './AuthorFormToggle'
import EditableAuthorsList from './EditableAuthorsList'

class Authors extends Component {

  state = {
    authors: [],
  }
  addNewAuthor = (newAuthor) => {
    this.setState({
      authors: [...this.state.authors, newAuthor]
    })
  }
  componentDidMount () {
    this.loadAuthorsFromServer() //loads authors and sets state authors array
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
  handleCreateFormSubmit = (author) => {
    this.createAuthor(author)
  }
  handleDeleteClick = (authorId) => {
    this.deleteAuthor(authorId)
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
  loadAuthorsFromServer = () => {
    axios.get('/api/authors.json')
    .then(response => {
      this.setState({ authors: response.data })
    })
    .catch(error => console.log(error))
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

export default Authors
