import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import './App.css';
import {theme} from './theme';

import {SnakeGamePage} from './pages/SnakeGamePage/SnakeGamePage';

export const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App" data-test-id="component-app">
      <Switch>
        <Route path="/play" component={SnakeGamePage} />
        <Redirect to="/play" />
      </Switch>
    </div>
  </ThemeProvider>
);
