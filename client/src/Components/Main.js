import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Authors from './Authors/Authors'
import Dashboard from './Dashboard/Dashboard'
import Plays from './Plays/Plays'
import PlayShow from './Plays/PlayShow'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/authors' component={Authors}/>
      <Route exact path='/plays' component={Plays}/>
      <Route path='/plays/:playId' component={PlayShow} />
    </Switch>
  </main>
)

export default Main
