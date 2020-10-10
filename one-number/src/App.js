import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import './componants/main.js';
import 'normalize.css';
import Main from './componants/main';
import Skaters from './componants/skaters.js';
import Goalies from './componants/goalies.js';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/skaters' component={Skaters}/>
        <Route path='/goalies' component={Goalies}/>
      </Switch>
  </Router>
  );
}

export default App;
