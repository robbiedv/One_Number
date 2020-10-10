import React from "react";
import "./../css/App.css";

function Skaters() {
  return (
    <div className="skaters">
      <div className="grid-container">
        <h1 className="main-title">Skaters</h1>
        <button id="skaterButton" className="statButton" type="submit">
          Get Draft Rankings
        </button>
      </div>
    </div>
  );
}

export default Skaters;
