import React from "react";
import "./../css/App.scss";
import goaliesJSON from "./../data/goalies.json";
import "./../css/animations.scss";
import Nav from "./nav.js";

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
    let table = document.getElementById("goalieTable");
    let row = table.insertRow(0);
    let rank = row.insertCell(0);
    let player = row.insertCell(1);
    let num = row.insertCell(2);

    rank.innerHTML = "Rank";
    player.innerHTML = "Player";
    num.innerHTML = "Score";

    for (let i = 1; i < goalies.length + 1; i++) {
      let table = document.getElementById("goalieTable");
      let row = table.insertRow(i);
      let rank = row.insertCell(0);
      let player = row.insertCell(1);
      let num = row.insertCell(2);

      rank.innerHTML = i;
      player.innerHTML = goalies.sort(sortGoalies)[i - 1][0];
      num.innerHTML = goalies.sort(sortGoalies)[i - 1][2];
    }
  }

  /*************************
   *** LOADING ANIMATION ***
   ************************/
  function loading() {
    let load1 = document.getElementById("load-1").classList;
    let load2 = document.getElementById("load-2").classList;
    let load3 = document.getElementById("load-3").classList;

    setTimeout(function () {
      load1.add("loading1");
    }, 500);

    setTimeout(function () {
      load2.add("loading2");
    }, 3000);

    setTimeout(function () {
      load3.add("loading3");
    }, 5500);
  }

  /****************
   *** COMPONANT ***
   ****************/
  function clickHandler() {
    let x = document.getElementById("goalieButton");
    x.style.display = "none";
    loading();
    addGoalieStats();
    setTimeout(displayRankings, 8000);
  }
  return (
    <div className="stats-page">
      <div className="grid-container">
        <Nav />
        <h1 className="page-title">Goalies</h1>
        <button
          id="goalieButton"
          className="statButton"
          type="submit"
          onClick={clickHandler}
        >
          Get Draft Rankings
        </button>
        <div className="loading-anim">
          <p id="load-1">Getting Data . . .</p>
          <p id="load-2">Calculating Score . . .</p>
          <p id="load-3">Ranking Players . . .</p>
        </div>
        <table id="goalieTable"></table>
      </div>
    </div>
  );
}

export default Goalies;
