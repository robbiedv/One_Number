import React from "react";
import "./../css/App.scss";
import skatersJSON from "./../data/skaters.json";
import "./../css/animations.scss";
import Nav from "./nav.js";

function Skaters() {
  /*******************
   *** SORTING DATA ***
   *******************/
  let rightW = [];
  let leftW = [];
  let center = [];
  let defense = [];

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
  }

  function allSkaterSpread() {
    skaterSpread(leftW);
    skaterSpread(rightW);
    skaterSpread(center);
    skaterSpread(defense);
  }

  /***********************
   *** DISPLAY RANKINGS ***
   ***********************/
  function displayRankings() {
    let table = document.getElementById("skater-table");
    let row = table.insertRow(0);
    let rank = row.insertCell(0);
    let player = row.insertCell(1);
    let pos = row.insertCell(2);
    let num = row.insertCell(3);

    rank.innerHTML = "Rank";
    player.innerHTML = "Player";
    pos.innerHTML = "Pos";
    num.innerHTML = "Score";

    for (let i = 1; i < 501; i++) {
      let table = document.getElementById("skater-table");
      let row = table.insertRow(i);
      let rank = row.insertCell(0);
      let player = row.insertCell(1);
      let pos = row.insertCell(2);
      let num = row.insertCell(3);

      //counting with i to create ranking
      rank.innerHTML = i;
      player.innerHTML = oneNumber.sort(sortPlayers)[i - 1][0];
      pos.innerHTML = oneNumber.sort(sortPlayers)[i - 1][1];
      num.innerHTML = oneNumber.sort(sortPlayers)[i - 1][2];
    }
    //called here so that event listener can be attached to each tr
    displayPlayer();
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

  function displayTable() {
    let x = document.getElementById("skater-button");
    x.style.display = "none";
    loading();
    addSkaterStats();
    allSkaterSpread();
    setTimeout(displayRankings, 5500);
  }

  function displayPlayer() {
    let statName = [
      "Pos",
      "GP",
      "G",
      "A",
      "P",
      "PM",
      "PPG",
      "PPA",
      "S",
      "Blk",
      "H",
      "FW",
    ];

    let tr = document.getElementsByTagName("TR");
    let statCardName = document.getElementById("stat-card-name");

    /*** MATCHING SELECTED PLAYER TO DATABASE ***/
    for (let i = 1; i < tr.length; i++) {
      tr[i].onclick = function () {
        let trColl = tr[i];
        let trNodes = trColl.childNodes;
        let name = trNodes[1].innerText;
        statCardName.innerText = name;
        console.log(skatersJSON[name]);

        let table = document.getElementById("stat-card-table");
        let header = table.createTHead();
        let headerRow = header.insertRow(0);
        let year1 = table.insertRow(1);

        for (let i = 0; i < 12; i++) {
          //INSERTING STAT HEADERS
          let x = headerRow.insertCell(i);
          x.innerHTML = statName[i];
          //INSERTING STATS
          let y = year1.insertCell(i);
          //ACCESSING STATS FROM JSON USING STATNAME ARRAY
          if (skatersJSON[name][statName[i]] === undefined) {
            y.innerHTML = 0;
          } else {
            y.innerHTML = skatersJSON[name][statName[i]];
          }
        }
      };
    }
  }

  return (
    <div className="stats-page">
      <div className="grid-container">
        <Nav />
        <h1 className="page-title">Skaters</h1>
        <button
          id="skater-button"
          className="stat-button"
          type="submit"
          onClick={displayTable}
        >
          Get Draft Rankings
        </button>
        <div className="loading-anim">
          <p id="load-1">Getting Data . . .</p>
          <p id="load-2">Calculating Score . . .</p>
          <p id="load-3">Ranking Players . . .</p>
        </div>
        <table id="skater-table" className="main-table"></table>
        <div id="display-player">
          <h1 id="stat-card-name"></h1>
          <table id="stat-card-table"></table>
        </div>
      </div>
    </div>
  );
}

export default Skaters;
