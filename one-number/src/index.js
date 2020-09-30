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

// for every player (and Obj) create new array with all stats added together

for (let player in skaters) {
  console.log(`${player} GOALS = ${skaters[player].G}`)
}

let button = document.getElementById('button')

button.addEventListener('click', function() {
  console.log(skaters.Patrick_Kane)
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
