import API from '../../api/api'
import { createAuthor, deleteAuthor, getAuthors } from '../../api/authors'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

import AuthorFormToggle from './AuthorFormToggle'
import EditableAuthorsList from './EditableAuthorsList'

class Authors extends Component {

  state = {
    authors: [],
    errorStatus: ''
  }

  addNewAuthor = (newAuthor) => {
    this.setState({
      authors: [...this.state.authors, newAuthor]
    })
  }

  componentDidMount () {
    this.loadAuthorsFromServer() //loads authors and sets state authors array
  }

  async createAuthor (author) {
    const response = await createAuthor(author)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error creating author' })
    } else {
      this.addNewAuthor(response.data)
    }
  }

  async deleteAuthor (authorId) {
    const response = await deleteAuthor(authorId)
    API.delete(`authors/${authorId}`)
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error creating author' })
    } else {
      this.props.history.push('/authors')
    }

  }
  handleCreateFormSubmit = (author) => {
    this.createAuthor(author)
  }
  handleDeleteClick = (authorId) => {
    this.deleteAuthor(authorId)
  }
  handleEditFormSubmit = (author) => {
    API.put(`authors/${author.id}`,
      {
        author: author
      },
    ).then((response) => {
      this.updateAuthor(response.data)
    })

  }
  async loadAuthorsFromServer () {
    const response = await getAuthors()
    if (response.status >= 400) {
      this.setState({ errorStatus: 'Error fetching authors' })
    } else {
      this.setState({ authors: response.data })
    }
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
          <div id="authors">
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
