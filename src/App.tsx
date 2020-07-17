import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import {SnakeGamePage} from './pages/SnakeGamePage/SnakeGamePage';

export const App = () => (
  <div className="App" data-test-id="component-app">
    <Switch>
      <Route path="/play" component={SnakeGamePage} />
      <Redirect to="/play" />
    </Switch>
  </div>
);
