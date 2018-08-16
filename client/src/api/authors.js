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
  return API.delete(`authors/${authorId}`)
}

async function getAuthor(authorId) {
  return API.request(`authors/${authorId}`)
}

async function getAuthors() {
    return API.request(`authors`)
}

async function updateServerAuthor(author) {
  return API.put(`authors/${author.id}`,
    {
      author: author
    }
  )
}


export { createAuthor, deleteAuthor, getAuthor, getAuthors, updateServerAuthor }
