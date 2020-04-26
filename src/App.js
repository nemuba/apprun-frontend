import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Todo from './pages/Todo';

const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/about"><h1>About</h1></Route>
          <Route path="/" component={Todo}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
