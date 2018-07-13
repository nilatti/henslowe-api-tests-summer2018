import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Authors from './Authors'

const AuthorsNav = () => (
  <Switch>
    <Route path='/authors' component={Authors}/>
  </Switch>
)

export default AuthorsNav
