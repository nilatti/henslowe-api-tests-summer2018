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

// The Header creates links that can be used to navigate
// between routes.
class Navigation extends Component {
  state = {}

  render() {
    return (
      <header>
        <Navbar>
          <Nav>
            <NavItem href="/">Dashboard</NavItem>
            <NavItem href="/authors">Authors</NavItem>
            <NavItem href="/plays">Plays</NavItem>
            <NavItem href="/theaters">Theaters</NavItem>
          </Nav>
        </Navbar>
      </header>
    )
  }
}

export default Navigation