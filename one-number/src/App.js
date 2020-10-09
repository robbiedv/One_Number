import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import './componants/main.js';
import 'normalize.css';
import Main from './componants/main';
import Results from './componants/results.js';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/results' component={Results}/>
      </Switch>
  </Router>
  );
}

export default App;
