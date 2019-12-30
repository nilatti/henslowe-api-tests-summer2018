import React, {
  Component
} from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import Authors from './Authors/Authors'
import Dashboard from './Dashboard/Dashboard'
import Jobs from './Jobs/Jobs'
import Plays from './Plays/Plays'
import PlayScripts from './PlayScripts/PlayScripts'
import Productions from './Productions/Productions'
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
            <Route path='/playscripts/:id' component={PlayScripts} />
            <Route path='/productions' component={Productions} />
            <Route path='/theaters' component={Theaters} />
            <Route path='/spaces' component={Spaces} />
            <Route path='/users' component={Users} />
            <Route path='/specializations' component={Specializations} />
            <Route path='/jobs' component={Jobs} />
          </Switch>
        </main>
    )
  }
}

export default Main
