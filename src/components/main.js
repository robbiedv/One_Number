import React from "react";
import "./../css/App.scss";
import { Link } from "react-router-dom";
import Nav from "./nav.js";

function Main() {
  return (
    <div className="main">
      <div className="grid-container">
        <Nav />
        <h1 className="main-title">One Number</h1>
        <h2 className="main-tag">
          a draft assistant tool that ranks NHL players based on their fantasy
          league value
        </h2>
        <div id="start-button-div">
          <div id="goalie-div">
            <Link to="/goalies">
              <button className="start-button" type="submit">
                Goalies
              </button>
            </Link>
          </div>
          <div id="skaterDiv">
            <Link to="/skaters">
              <button className="start-button" type="submit">
                Skaters
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
