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
import Theaters from './Theaters/Theaters'

class Main extends Component {
  render() {
    return (
      <main>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/authors/new' render={(props) => <Authors {...props} authorFormOpen={true} />} />
            <Route path='/authors' render={(props) => <Authors {...props} authorFormOpen={false} />} />
            <Route path='/plays' component={Plays}/>
            <Route path='/theaters' component={Theaters} />
          </Switch>
        </main>
    )
  }
}

export default Main