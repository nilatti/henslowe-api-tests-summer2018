import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Authors from './Authors/Authors'
import Plays from './Plays/Plays'

const Navigation = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/plays">Plays</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/authors" component={Authors} />
      <Route path="/plays" component={Plays} />
    </div>
  </Router>
)

export default Navigation
