import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import Acts from './Acts/Acts'
import Characters from './Characters/Characters'
import NoMatch from '../NoMatch'

class PlayInfo extends Component {
  render () {
  return(
        <div>
      PLAY INFO
      <Route path={`/plays/:playId/characters`} component={Characters} />
      <Route path={`/plays/:playId/acts`} component={Acts} />
      </div>
  )
}
}
export default PlayInfo
