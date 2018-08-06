import request from './request'
import API from './api'

async function createAuthor(author) {
  return API.post(
    'authors',
      {
        author
      }
    )
}

async function deleteAuthor(authorId) {
  API.delete(`authors/${authorId}`)
}

async function getAuthor(authorId) {
  return API.request(`authors/${authorId}`)
}

async function getAuthors() {
    return API.request(`http://localhost:3001/api/authors`)
}



export { createAuthor, deleteAuthor, getAuthor, getAuthors }
