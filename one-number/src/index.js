import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import skaters from './data/skaters.json';

ReactDOM.render(<React.StrictMode>
  <App/>
</React.StrictMode>, document.getElementById('root'));

/*******************
*** EXAMPLE DATA ***
*******************/

let exampleData = {
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

/*******************
*** SORTING DATA ***
*******************/

let rightW = []
let leftW = []
let center = []
let defense = []


/***
Adding each players stats together and pushing
to new array based on player position
***/

function addStats() {
  for (let player in skaters) {
    let stats = 0;
    stats += parseInt(skaters[player].GP);
    stats += parseInt(skaters[player].G);
    stats += parseInt(skaters[player].A);
    stats += parseInt(skaters[player].P);
    stats += parseInt(skaters[player].PM);
    stats += parseInt(skaters[player].PPG);
    stats += parseInt(skaters[player].PPA);
    stats += parseInt(skaters[player].S);
    stats += parseInt(skaters[player].BLK);
    stats += parseInt(skaters[player].H);
    stats += parseInt(skaters[player].FW);
    let pos = skaters[player].Pos;
    if (pos === "RW") {
      rightW.push(player, stats)
    } else if (pos === "LW") {
      leftW.push(player, stats)
    } else if (pos === "C" || pos === "F") {
      center.push([player, stats])
    } else if (pos === "D") {
      defense.push(player, stats)
    }
  }
}

addStats()

/***
Callback function for sorting players based
on number of total stats in descending oder
***/

function sortPlayers(a, b) {
  for (let index in defense) {
    if (a[1] > b[1]) {
      return -1;
    } else if (b[1] > a[1]) {
      return 1;
    } else {
      return 0;
    }
  }
}

let button = document.getElementById('button')

button.addEventListener('click', function() {
  console.log(center.sort(sortPlayers))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
