import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Navigation = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/authors'>Authors</Link></li>
        <li><Link to='/plays'>Plays</Link></li>
        <li><Link to='/theaters'>Theaters</Link></li>
      </ul>
    </nav>
  </header>
)

export default Navigation
