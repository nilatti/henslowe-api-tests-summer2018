import React, {
  Component
} from 'react'
import {
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem
} from 'react-bootstrap'

import {
  getAuthorNames
} from '../api/authors'
import {
  getPlays
} from '../api/plays'
import {
  getTheaterNames
} from '../api/theaters'


// The Header creates links that can be used to navigate
// between routes.
class Navigation extends Component {
  state = {
    authors: [],
    plays: [],
    theaters: [],
  }

  componentDidMount() {
    this.loadAuthorsFromServer() //loads authors and sets state authors array
    this.loadPlaysFromServer()
    this.loadTheatersFromServer()
  }

  async loadAuthorsFromServer() {
    const response = await getAuthorNames()
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

  async loadPlaysFromServer() {
    const response = await getPlays()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching authors'
      })
    } else {
      this.setState({
        plays: response.data
      })
    }
  }

  async loadTheatersFromServer() {
    const response = await getTheaterNames()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching theaters'
      })
    } else {
      this.setState({
        theaters: response.data
      })
    }
  }

  render() {
    let authors = this.state.authors.map(author =>
      <MenuItem eventKey={author.id} key={author.id} href={`/authors/${author.id}`}>{author.first_name} {author.last_name}</MenuItem>
    )
    let plays = this.state.plays.map(play =>
      <MenuItem eventKey={play.id} key={play.id} href={`/plays/${play.id}`}>{play.title}</MenuItem>
    )
    let theaters = this.state.theaters.map(theater =>
      <MenuItem eventKey={theater.id} key={theater.id} href={`/theaters/${theater.id}`}>{theater.name}</MenuItem>
    )
    return (
      <header>
        <Navbar>
          <Nav>
            <NavItem href="/">Dashboard</NavItem>
            <NavDropdown title="Authors" id="authors-dropdown">
              {authors}
              <MenuItem eventKey='add' key='add' href='/authors/new'>Add New</MenuItem>
            </NavDropdown>
            <NavDropdown title="Plays" id="plays-dropdown">
              {plays}
            </NavDropdown>
            <NavDropdown title="Theaters" id="theaters-dropdown">
              {theaters}
            </NavDropdown>
          </Nav>
        </Navbar>
      </header>
    )
  }
}

export default Navigation