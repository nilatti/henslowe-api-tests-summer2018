import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import Main from './Components/Main'
import { Grid } from 'react-bootstrap'
import './App.css';

const App = () => (
  <BrowserRouter>
    <Grid fluid={true}>
      <div className="App">
        <Navigation />
        <Main />
      </div>
    </Grid>
  </BrowserRouter>
)

export default App
