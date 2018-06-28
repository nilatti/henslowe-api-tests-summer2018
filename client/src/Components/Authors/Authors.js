import React, { Component } from 'react'
import Client from '../../Client.js'
import ApiUtils from '../../ApiUtils'

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
    console.log('checking this', this)
    this.setState({
      authors: [...this.state.authors, newAuthor]
    })
  }

  createAuthor = (author) => {
    let body = JSON.stringify({ author })
    console.log(body)
    axios.post(
      '/api/authors',
      {
        author
      }
    )
    .then(response => {
      this.addNewAuthor(response.data)
      console.log('here is the state', this.state)

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

  handleEditFormSubmit = (author) => {
    fetch(`/api/authors/${author.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ author: author }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      this.updateAuthor(author)
    })
  }

  handleCreateFormSubmit = (author) => {
    console.log(author)
    this.createAuthor(author)
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
      <div>
        This is the authors index page.
        <EditableAuthorsList
          authors={this.state.authors}
          onFormSubmit={this.handleEditFormSubmit}
        />
        <AuthorFormToggle
          onFormSubmit={this.handleCreateFormSubmit}
        />
      </div>
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
