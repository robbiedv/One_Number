import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import skaters from './data/skaters.json';

ReactDOM.render(<React.StrictMode>
  <App/>
</React.StrictMode>, document.getElementById('root'));

// for every player create new key value pair. Player: 1Number

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

let rw = []
let lw = []
let c = []
let d = []

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
      rw.push(player, stats)
    } else if (pos === "LW") {
      lw.push(player, stats)
    } else if (pos === "C" || pos === "F") {
      c.push([player, stats])
    } else if(pos === "D") {
      d.push(player, stats)
    }
  }
}

let button = document.getElementById('button')

button.addEventListener('click', function() {
  addStats()
  console.log(c)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
