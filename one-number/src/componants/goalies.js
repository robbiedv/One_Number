import React from "react";
import "./../css/App.css";
import skatersJSON from "./../data/skaters.json";
import goaliesJSON from "./../data/goalies.json";

function Goalies() {
  /*******************
   *** SORTING DATA ***
   *******************/
  let goalies = [];

  /***
    Adding each goalies stats together and pushing
    to new array based on player position
    ***/
  function addGoalieStats() {
    for (let player in goaliesJSON) {
      let stats = 0;
      stats += parseInt(goaliesJSON[player].GS);
      stats += parseInt(goaliesJSON[player].W);
      stats += parseInt(goaliesJSON[player].GA);
      stats += parseInt(goaliesJSON[player].SV);
      stats += parseInt(goaliesJSON[player].SV);
      stats += parseInt(goaliesJSON[player].SH * 50);
      let pos = goaliesJSON[player].Pos;
      stats = Math.round(stats / 35);
      goalies.push([player, pos, stats]);
    }
  }

  /***
    Callback function for sorting players based
    on number of total stats in descending oder
    ***/
  let callbackArr = [1, 4];

  function sortGoalies(a, b) {
    for (let index in callbackArr) {
      if (a[2] > b[2]) {
        return -1;
      } else if (b[2] > a[2]) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  function displayRankings() {
    for (let i = 0; i < goalies.length; i++) {
      let table = document.getElementById("goalieTable");
      let row = table.insertRow(i);
      let rank = row.insertCell(0);
      let player = row.insertCell(1);
      let num = row.insertCell(2);

      rank.innerHTML = i + 1;
      player.innerHTML = goalies.sort(sortGoalies)[i][0];
      num.innerHTML = goalies.sort(sortGoalies)[i][2];
    }
  }

  /****************
   *** COMPONANT ***
   ****************/
  function clickHandler() {
    let x = document.getElementById("goalieButton");
    x.style.display = "none";
    addGoalieStats();
    setTimeout(displayRankings, 2000)
  }
  return (
    <div className="goalies">
      <div className="grid-container">
        <h1 className="main-title">Goalies</h1>
        <button
          id="goalieButton"
          className="statButton"
          type="submit"
          onClick={clickHandler}
        >
          Get Draft Rankings
        </button>
        <table id="goalieTable"></table>
      </div>
    </div>
  );
}

export default Goalies;
