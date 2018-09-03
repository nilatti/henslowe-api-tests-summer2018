import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Authors from './Authors/Authors'
import EditableAuthor from './Authors/EditableAuthor'
import EditablePlay from './Plays/EditablePlay'
import Dashboard from './Dashboard/Dashboard'
import Plays from './Plays/Plays'
import Theaters from './Theaters/Theaters'

class Main extends Component {

  render () {
    return (
        <main>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/authors' component={Authors}/>
            <Route path='/plays' component={Plays}/>
            <Route path='/theaters' component={Theaters} />
          </Switch>
        </main>
    )
  }
}

export default Main
