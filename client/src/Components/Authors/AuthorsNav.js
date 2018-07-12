import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Authors from './Authors'
import EditableAuthor from './AuthorShow'

const AuthorsNav = () => (
  <Switch>
    <Route exact path='/authors' component={Authors}/>
    <Route path='/authors/:authorId' component={EditableAuthor}/>
  </Switch>
)


export default AuthorsNav
