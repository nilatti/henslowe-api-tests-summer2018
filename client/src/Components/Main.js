import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import AuthorsNav from './Authors/AuthorsNav'
import Plays from './Plays/Plays'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/authors' component={AuthorsNav}/>
      <Route path='/plays' component={Plays}/>
    </Switch>
  </main>
)

export default Main
