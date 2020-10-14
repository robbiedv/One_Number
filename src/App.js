import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/App.scss";
import "./components/main.js";
import "normalize.css";
import Main from "./components/main";
import Skaters from "./components/skaters.js";
import Goalies from "./components/goalies.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/skaters" component={Skaters} />
        <Route path="/goalies" component={Goalies} />
      </Switch>
    </Router>
  );
}

export default App;
