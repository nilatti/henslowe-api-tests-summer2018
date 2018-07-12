import axios from 'axios'

const getAuthors = () => axios.get('/api/authors.json')

export default { getAuthors }
