import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateServerAuthor
} from '../../api/authors'
import React, {
  Component
} from 'react'
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  withRouter,
  Route
} from 'react-router-dom'

import AuthorFormToggle from './AuthorFormToggle'
// import EditableAuthorsList from './EditableAuthorsList'
import EditableAuthor from './EditableAuthor'

class Authors extends Component {

  state = {
    authors: [],
    errorStatus: '',
  }

  addNewAuthor = (newAuthor) => {
    this.setState({
      authors: [...this.state.authors, newAuthor]
    })
  }

  componentDidMount() {
    this.loadAuthorsFromServer() //loads authors and sets state authors array
  }

  async createAuthor(author) {
    const response = await createAuthor(author)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating author'
      })
    } else {
      this.addNewAuthor(response.data)
    }
  }

  async deleteAuthor(authorId) {
    const response = await deleteAuthor(authorId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting author'
      })
    } else {
      this.setState({
        authors: this.state.authors.filter(author =>
          author.id != authorId
        )
      })
    }
  }

  async loadAuthorsFromServer() {
    const response = await getAuthors()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching authors'
      })
    } else {
      this.setState({
        authors: response.data
      })
    }
  }

  async updateAuthorOnServer(author) {
    const response = await updateServerAuthor(author)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating author'
      })
    } else {
      this.updateAuthor(response.data)
    }
  }

  handleCreateFormSubmit = (author) => {
    this.createAuthor(author)
  }
  handleDeleteClick = (authorId) => {
    this.deleteAuthor(authorId)
  }

  handleEditFormSubmit = (author) => {
    this.updateAuthorOnServer(author)
    this.updateAuthor(author)
  }

  updateAuthor = (author) => {
    let newAuthors = this.state.authors.filter((a) => a.id !== author.id)
    newAuthors.push(author)
    this.setState({
      authors: newAuthors
    })
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="authors">
            <h2>Authors</h2>
            <AuthorFormToggle
            onFormSubmit={this.handleCreateFormSubmit}
            isOpen={false}
            />
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
        </Col>
      </Row>
    )
  }
}

export default Authors