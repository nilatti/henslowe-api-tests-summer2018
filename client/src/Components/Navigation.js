import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Navigation = () => (
  <header>
    <Navbar>
      <Nav>
        <NavItem href="/">Dashboard</NavItem>
        <NavItem href='/authors'>Authors</NavItem>
        <NavItem href='/plays'>Plays</NavItem>
        <NavItem href='/theaters'>Theaters</NavItem>
      </Nav>
    </Navbar>
  </header>
)

export default Navigation
