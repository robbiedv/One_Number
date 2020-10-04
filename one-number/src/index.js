import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import skatersJSON from './data/skaters.json';
import goaliesJSON from './data/goalies.json';

ReactDOM.render(<React.StrictMode>
  <App/>
</React.StrictMode>, document.getElementById('root'));

/*******************
*** EXAMPLE DATA ***
*******************/

let exampleSkater = {
  Riley_Stillman: {
    Pos: "D",
    GP: "34",
    G: "0",
    A: "5",
    P: "5",
    PM: "14",
    PPG: "0",
    PPA: "0",
    S: "39",
    BLK: "57",
    H: "59",
    FW: "0"
  }
}

let exampleGoalie = {
    Jake_Allen: {
        GS: "21",
        W: "12",
        GA: "48",
        SV: "607",
        SV: ".927",
        SH: "2"
    }
  }



/*******************
*** SORTING DATA ***
*******************/

let rightW = []
let leftW = []
let center = []
let defense = []
let goalies = []


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
    stats += parseInt(skatersJSON[player].PM);
    stats += parseInt(skatersJSON[player].PPG);
    stats += parseInt(skatersJSON[player].PPA);
    stats += parseInt(skatersJSON[player].S);
    stats += parseInt(skatersJSON[player].BLK);
    stats += parseInt(skatersJSON[player].H);
    stats += parseInt(skatersJSON[player].FW);
    let pos = skatersJSON[player].Pos;
    if (pos === "RW") {
      rightW.push(player, pos, stats)
    } else if (pos === "LW") {
      leftW.push(player, pos, stats)
    } else if (pos === "C" || pos === "F") {
      center.push([player, pos, stats])
    } else if (pos === "D") {
      defense.push(player, pos, stats)
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
    stats += parseInt(goaliesJSON[player].SH);
    let pos = goaliesJSON[player].Pos;
    goalies.push(player, stats)
  }
}

addSkaterStats()
addGoalieStats()

/***
Callback function for sorting players based
on number of total stats in descending oder
***/

function sortPlayers(a, b) {
  for (let index in goalies) {
    if (a[2] > b[2]) {
      return -1;
    } else if (b[2] > a[2]) {
      return 1;
    } else {
      return 0;
    }
  }
}

let button = document.getElementById('button')

button.addEventListener('click', function() {
  console.log(goalies.sort(sortPlayers))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
