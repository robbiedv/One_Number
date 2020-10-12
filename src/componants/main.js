import React from "react";
import "./../css/App.scss";
import { Link } from "react-router-dom";

function Main() {

  return (
    <div className="main">
      <div className="grid-container">
        <h1 className="main-title">
          One Number
          <br />
          <span className="main-tag">Draft Your Team</span>
        </h1>
        <p className="explain">
          Players are ranked to determine their draft value at each position.
          High ranking players may not be the best players, but they are the most rare, making them more valuable during a draft.
        </p>
        <div id="startButtonDiv">
          <div id="goalieDiv">
            <Link to="/goalies">
              <button className="startButton" type="submit">
                Goalies
              </button>
            </Link>
          </div>
          <div id="skaterDiv">
            <Link to="/skaters">
              <button className="startButton" type="submit">
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
