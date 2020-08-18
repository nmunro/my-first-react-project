import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

import Editor from './components/Editor';
import Header from './components/Header';
import Help from './components/Help';
import Programs from './components/Programs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path = "/"  component = {Editor}/>
          <Route exact path = "/programs"  component = {Programs}/>
          <Route exact path = "/help" component = {Help}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
