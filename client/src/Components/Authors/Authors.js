import React, { Component } from 'react'
import Client from '../../Client.js'
import { Col } from 'react-bootstrap'

import axios from 'axios'
import update from 'immutability-helper'

import EditableAuthor from './AuthorShow'
import AuthorFormToggle from './AuthorForm'


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
    console.log('author object', author)
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
    console.log('authors before update', this.state.authors)
    console.log('object returned', author)
    let newAuthors = this.state.authors.filter((a) => a.id !== author.id)
    console.log('authors after filter', newAuthors)
    newAuthors.push(author)
    console.log('authors after push', newAuthors)
    this.setState({
      authors: newAuthors
    })
    console.log('authors after update', this.state.authors)
  }

  render () {
    return (
      <Col md={8} mdoffset={8}>
        <div>
          <h2>Authors</h2>
          <EditableAuthorsList
            authors={this.state.authors}
            onFormSubmit={this.handleEditFormSubmit}
            onDeleteClick={this.handleDeleteClick}
          />
          <AuthorFormToggle
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </Col>
    )
  }
}

class EditableAuthorsList extends Component {
  render () {
    const authors = this.props.authors.map((author) => (
      <EditableAuthor
        key={author.id}
        id={author.id}
        first_name={author.first_name}
        middle_name={author.middle_name}
        last_name={author.last_name}
        birthdate={author.birthdate}
        deathdate={author.deathdate}
        nationality={author.nationality}
        gender={author.gender}
        plays={author.plays}
        onFormSubmit={this.props.onFormSubmit}
        onDeleteClick={this.props.onDeleteClick}
      />
    ))
    return (
      <div id='authors'>
        {authors}
      </div>
    )
  }
}



export default Authors
