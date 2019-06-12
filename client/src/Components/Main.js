import React, {
  Component
} from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import Authors from './Authors/Authors'
import Dashboard from './Dashboard/Dashboard'
import Plays from './Plays/Plays'
import Spaces from './Spaces/Spaces'
import Specializations from './Specializations/Specializations'
import Theaters from './Theaters/Theaters'
import Users from './Users/Users'

class Main extends Component {
  render() {
    return (
      <main>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/authors' render={(props) => <Authors {...props} authorFormOpen={false} />} />
            <Route path='/plays' component={Plays}/>
            <Route path='/theaters' component={Theaters} />
            <Route path='/spaces' component={Spaces} />
            <Route path='/users' component={Users} />
            <Route path='/specializations' component={Specializations} />
          </Switch>
        </main>
    )
  }
}

export default Main
