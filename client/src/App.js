import React from 'react'
import {
  Col,
  Container
} from 'react-bootstrap'

import Footer from './Components/Footer'
import Navigation from './Components/Navigation'
import Main from './Components/Main'
import './App.css';
import './react-datetime.css'

const App = () => (
  <Container fluid={true}>
    <div className="App">
      <Navigation />
      <Col xs={12}>
        <Main />
        <Footer />
      </Col>

    </div>
  </Container>
)

export default App
