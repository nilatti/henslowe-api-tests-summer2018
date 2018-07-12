import React from 'react'
import Navigation from './Components/Navigation'
import Main from './Components/Main'
import { Grid } from 'react-bootstrap'
import './App.css';

const App = () => (
  <Grid fluid={true}>
    <div className="App">
      <Navigation />
      <Main />
    </div>
  </Grid>
)

export default App
