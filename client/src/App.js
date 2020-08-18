import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Editor from './components/Editor';
import Header from './components/Header';
import Help from './components/Help';
import Programs from './components/Programs';

function App() {
  return (
    <Container fluid className="App">
      <Row>
          <Col>
            <Header/>
          </Col>
      </Row>
      <Row>
        <Col>
          <BrowserRouter>
            <Switch>
              <Route exact path = "/"  component = {Editor}/>
              <Route exact path = "/programs"  component = {Programs}/>
              <Route exact path = "/help" component = {Help}/>
            </Switch>
          </BrowserRouter>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
