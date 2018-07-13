import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Authors from './Authors'
import EditableAuthor from './AuthorShow'

const AuthorsNav = () => (
  <Switch>
    <Route path='/authors' component={Authors}/>
  </Switch>
)

export default AuthorsNav
