import axios from 'axios'

export default async term => {
  const response = await axios.get('/api/authors.json')

  return response.data.results
}
