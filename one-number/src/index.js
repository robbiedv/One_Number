import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import skaters from './data/skaters.json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// for every player create new key value pair. Player: 1Number

// for (let player in skaters) {
//   let g = skaters[player].G
//   let a = skaters[player].A
//   console.log(player, (g + a),  skaters[player].P)
// }

for (let player in skaters) {
  let g = parseInt(skaters[player].G);
  let a = parseInt(skaters[player].A);
  console.log(player, " # = ", g + a, "Points = ", skaters[player].P)
}


let button = document.getElementById('button')

button.addEventListener('click', function() {
  console.log(skaters.Patrick_Kane.G)
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
