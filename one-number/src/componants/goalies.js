import React from "react";
import "./../css/App.css";

function Goalies() {
  return (
    <div className="goalies">
      <div className="grid-container">
        <h1 className="main-title">Goalies</h1>
        <button id="goalieButton" className="statButton" type="submit">
          Get Draft Rankings
        </button>
      </div>
    </div>
  );
}

export default Goalies;
