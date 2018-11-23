import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Authors from './Components/Authors/Authors'
import Dashboard from './Components/Dashboard/Dashboard'
import Navigation from './Components/Navigation'
import Plays from './Components/Plays/Plays'
import Theaters from './Components/Theaters/Theaters'

const PrimaryLayout = () => (
  <div className='primary-layout'>
    <header>
      Henslowes Cloud
      <Route path='/' component={Navigation} />
    </header>
    <main>
    <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/authors' component={Authors}/>
      <Route path='/plays' component={Plays}/>
      <Route path='/theaters' component={Theaters} />
    </Switch>
    </main>
  </div>
)

export default PrimaryLayout
