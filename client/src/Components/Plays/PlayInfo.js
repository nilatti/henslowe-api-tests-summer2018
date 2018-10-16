import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { BrowserRouter as Switch, Router, Route, Link } from 'react-router-dom'

import Acts from './Acts/Acts'
import Characters from './Characters/Characters'

class PlayInfo extends Component {
    render () {
      return(
        <Switch>
          <Route exact path='/acts' component={Acts}/>
          <Route path='/characters' component={Characters}/>
        </Switch>
      )
    }
}

export default PlayInfo
