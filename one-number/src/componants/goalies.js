import React from "react";
import "./../css/App.css";
import skatersJSON from "./../data/skaters.json";
import goaliesJSON from "./../data/goalies.json";

function Goalies() {

    /*******************
     *** SORTING DATA ***
     *******************/
    let rightW = [];
    let leftW = [];
    let center = [];
    let defense = [];
    let goalies = [];

    /***
    Adding each players stats together and pushing
    to new array based on player position
    ***/

    function addSkaterStats() {
      for (let player in skatersJSON) {
        let stats = 0;
        stats += parseInt(skatersJSON[player].GP);
        stats += parseInt(skatersJSON[player].G);
        stats += parseInt(skatersJSON[player].A);
        stats += parseInt(skatersJSON[player].P);
        stats += parseInt(skatersJSON[player].PM * 0.5);
        stats += parseInt(skatersJSON[player].PPG * 5);
        stats += parseInt(skatersJSON[player].PPA * 5);
        stats += parseInt(skatersJSON[player].S);
        stats += parseInt(skatersJSON[player].BLK);
        stats += parseInt(skatersJSON[player].H * 0.5);
        stats += parseInt(skatersJSON[player].FW) * 0.05;
        let pos = skatersJSON[player].Pos;
        stats = Math.round(stats / 10);
        if (pos === "RW") {
          rightW.push([player, pos, stats]);
        } else if (pos === "LW") {
          leftW.push([player, pos, stats]);
        } else if (pos === "C" || pos === "F") {
          center.push([player, pos, stats]);
        } else if (pos === "D") {
          defense.push([player, pos, stats]);
        }
      }
    }

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
        stats = stats / 50;
        goalies.push([player, pos, stats]);
      }
    }

    /***
    Callback function for sorting players based
    on number of total stats in descending oder
    ***/

    let callbackArr = [1, 4];

    function sortPlayers(a, b) {
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

    let oneNumber = [];

    function skaterSpread(position) {
      let one = position.sort(sortPlayers)[0][2];
      let twenty = position.sort(sortPlayers)[20][2];
      let spread = one - twenty;

      for (let i = 0; i < position.length; i++) {
        position[i][2] += spread;
        oneNumber.push(position[i]);
      }

      console.log(one, twenty, spread);
    }

    function allSkaterSpread() {
      skaterSpread(leftW);
      skaterSpread(rightW);
      skaterSpread(center);
      skaterSpread(defense);
    }

    addSkaterStats();
    addGoalieStats();
    allSkaterSpread();

    /****************
     *** COMPONANT ***
     ****************/
    // function clickHandler() {
    //   console.log(oneNumber.sort(sortPlayers));
    // }
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
