import React from "react";
import "./../css/App.scss";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="nav">
      <Link to="/" exact>
        <button className="navButton"></button>
      </Link>
    </div>
  );
}

export default Main;
