import React from "react";
import "./../css/App.scss";
import yearOne from "./../data/goalies1.json";
import yearTwo from "./../data/goalies2.json";
import yearThree from "./../data/goalies3.json";
import yearFour from "./../data/goalies4.json";
import yearFive from "./../data/goalies5.json";
import "./../css/animations.scss";
import Nav from "./nav.js";

/*******************
 *** SORTING DATA ***
 *******************/

function Goalies() {

  /***
    Adding each goalies stats together and pushing
    to new array based on player position
    ***/
  const fiveYearStats = [yearOne, yearTwo, yearThree, yearFour, yearFive]

  let goalies = [];

  let goalieRank1 = []
  let goalieRank2 = []
  let goalieRank3 = []
  let goalieRank4 = []
  let goalieRank5 = []


  function addGoalieStats() {

    for (let year = 0; year < fiveYearStats.length; year ++) {
      for (let player in fiveYearStats[year]) {
        // adding up each players stats
        let stats = 0;
        stats += parseInt(fiveYearStats[year][player].GS);
        stats += parseInt(fiveYearStats[year][player].W);
        stats += parseInt(fiveYearStats[year][player].GA);
        stats += parseInt(fiveYearStats[year][player].SV);
        stats += parseInt(fiveYearStats[year][player].SVPCT * 1000);
        stats += parseInt(fiveYearStats[year][player].SH * 50);
        stats = Math.round(stats / 35);

        // sorting each years stats into corresponding arrays
        if (year === 0) {
          goalieRank1.push([player, stats])
        } else if (year === 1) {
          goalieRank2.push([player, stats])
        } else if (year === 2) {
          goalieRank3.push([player, stats])
        } else if (year === 3) {
          goalieRank4.push([player, stats])
        } else if (year === 4) {
          goalieRank5.push([player, stats])
        }
      }
    }
  }

  const fiveYearRank = [goalieRank1, goalieRank2, goalieRank3, goalieRank4, goalieRank5]

  function totalingStats() {
    for (let year = 0; year < fiveYearRank.length; year ++) {
      for (let player in fiveYearRank[year]) {
        
      }

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


/**********************
*** RANKING PLAYERS ***
**********************/
  function displayRankings() {
    // setting up table variables
    let table = document.getElementById("goalie-table");
    let row = table.insertRow(0);
    let rank = row.insertCell(0);
    let player = row.insertCell(1);
    let num = row.insertCell(2);

    // creating headers
    rank.innerHTML = "Rank";
    player.innerHTML = "Player";
    num.innerHTML = "Score";

    // looping though each goalies and creating a new row
    for (let i = 1; i < goalies.length + 1; i++) {
      let table = document.getElementById("goalie-table");
      let row = table.insertRow(i);
      let rank = row.insertCell(0);
      let player = row.insertCell(1);
      let num = row.insertCell(2);

      // numbering players from 1 to last
      rank.innerHTML = i;
      // using the sorting callback function,
      player.innerHTML = goalies.sort(sortGoalies)[i - 1][0];
      num.innerHTML = goalies.sort(sortGoalies)[i - 1][2];
    }
    displayPlayer();
  }

  /*************************
   *** LOADING ANIMATION ***
   ************************/
  function loading() {
    let load1 = document.getElementById("load-1").classList;
    let load2 = document.getElementById("load-2").classList;
    let load3 = document.getElementById("load-3").classList;

    setTimeout(function() {
      load1.add("loading1");
    }, 500);

    setTimeout(function() {
      load2.add("loading2");
    }, 3000);

    setTimeout(function() {
      load3.add("loading3");
    }, 5500);
  }

  /***************************
  *** DISPLAY PLAYER STATS ***
  ***************************/
  function displayPlayer() {
    /*** CONFIGUREING DISPLAY OF STATS ***/
    let playerStats = document.getElementById("display-player")
    let viewport = window.pageYOffset;
    //player stats apper at the top of the viewport
    playerStats.style.padding = viewport;

    /*** CONFIGUREING INSERTION OF STATS ***/
    let tr = document.getElementsByTagName("TR");
    let statCardName = document.getElementById("stat-card-name");

    let statName = [
      "GS",
      "W",
      "GA",
      "SV",
      "SVPCT",
      "SH"
    ];

    /*** MATCHING SELECTED PLAYER TO DATABASE ***/
    for (let i = 1; i < tr.length; i++) {
      tr[i].onclick = function() {
        playerStats.style.display = "block";
        let trCollection = tr[i];
        let trNodes = trCollection.childNodes;
        // let pos = trNodes[2].innerText;
        let name = trNodes[1].innerText;
        // push player name and pos to h1
        statCardName.innerText = name;

        let table = document.getElementById("stat-card-table");
        let header = table.createTHead();
        let headerRow = header.insertRow(0);
        let year1 = table.insertRow(1);

        for (let i = 0; i < statName.length; i++) {
          //inserting stat header
          let x = headerRow.insertCell(i);
          x.innerHTML = statName[i];
          //inserting stats
          let y = year1.insertCell(i);
          //accessing stats from JSON using statName array
          if (yearFive[name][statName[i]] === undefined) {
            y.innerHTML = 0;
          } else {
            y.innerHTML = yearFive[name][statName[i]];
          }
        }
      };
    }
  }

  function closePlayerStats() {
    //close player stats window
    let playerStats = document.getElementById("display-player")
    playerStats.style.display = "none";

    //clear player data from table
    let table = document.getElementById("stat-card-table");
    table.deleteTHead();
    for (let i = 0; i < table.length; i++) {
      table.deleteRow(i)
    }
  }

  /****************
   *** COMPONANT ***
   ****************/
  function clickHandler() {
    let x = document.getElementById("goalie-button");
    x.style.display = "none";
    loading();
    addGoalieStats();
    totalingStats();
    setTimeout(displayRankings, 8000);
  }
  return (<div className="stats-page">
    <div className="grid-container">
      <Nav/>
      <h1 className="page-title">Goalies</h1>
      <button id="goalie-button" className="stat-button" type="submit" onClick={clickHandler}>
        Get Draft Rankings
      </button>
      <div className="loading-anim">
        <p id="load-1">Getting Data . . .</p>
        <p id="load-2">Calculating Score . . .</p>
        <p id="load-3">Ranking Players . . .</p>
      </div>
      <table id="goalie-table" className="main-table"></table>
      <div id="display-player">
        <span id="exit-button" onClick={closePlayerStats}></span>
        <h1 id="stat-card-name"></h1>
        <table id="stat-card-table"></table>
      </div>
    </div>
  </div>);
}

export default Goalies;
