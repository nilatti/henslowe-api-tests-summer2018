import React from 'react'
import { Col } from 'react-bootstrap'
import Navigation from './Components/Navigation'
import Main from './Components/Main'
import { Grid } from 'react-bootstrap'
import './App.css';

const App = () => (
  <Grid fluid={true}>
    <div className="App">
      <Navigation />
      <Col xs={12}>
        <Main />
      </Col>
    </div>
  </Grid>
)

export default App
