import React, {
  Component
} from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'
import Authors from './Authors/Authors'
import Dashboard from './Dashboard/Dashboard'
import DoublingCharts from './Productions/DoublingCharts'
import Jobs from './Jobs/Jobs'
import Plays from './Plays/Plays'
import PlayScripts from './PlayScripts/PlayScripts'
import Productions from './Productions/Productions'
import ProductionRehearsalSchedule from './Productions/RehearsalSchedule/ProductionRehearsalSchedule'
import Spaces from './Spaces/Spaces'
import Specializations from './Specializations/Specializations'
import Theaters from './Theaters/Theaters'
import Users from './Users/Users'

export default function Main () {
  let { path } = useRouteMatch();
  return (
    <main>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/authors' render={(props) => <Authors {...props} authorFormOpen={false} />} />
          <Route path='/plays/:id/playscripts/' component={PlayScripts} />
          <Route path='/plays' component={Plays}/>
          <Route path={`/productions/:id/doubling_charts/`} component={DoublingCharts} />
          <Route path={`/productions/:id/rehearsal_schedule`} component={ProductionRehearsalSchedule} />
          <Route path={`/productions`} component={Productions} />
          <Route path='/theaters' component={Theaters} />
          <Route path='/spaces' component={Spaces} />
          <Route path='/users' component={Users} />
          <Route path='/specializations' component={Specializations} />
          <Route path='/jobs' component={Jobs} />
        </Switch>
      </main>
  )
}
