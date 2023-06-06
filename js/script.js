'use strict';

const gamePoint = 100;
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let activePlayer = 0;

function swiftBtns() {
  if (holdBtn.classList.contains('btn--right')) {
    rollBtn.classList.remove('btn--right');
    rollBtn.classList.add('btn--left');
    holdBtn.classList.remove('btn--right');
    holdBtn.classList.add('btn--left');
  } else {
    rollBtn.classList.add('btn--right');
    rollBtn.classList.remove('btn--left');
    holdBtn.classList.add('btn--right');
    holdBtn.classList.remove('btn--left');
  }
}
function addScore() {
  //add the current score to the total score
  document.getElementById('score--' + activePlayer).textContent =
    Number(document.getElementById('score--' + activePlayer).textContent) +
    Number(document.getElementById('current--' + activePlayer).textContent);
}

function resetCurrentScore() {
  document.getElementById('current--' + activePlayer).textContent = 0;
}

function switchPlayer(diceOne) {
  // reset the dice image to default if hold button is clicked
  if (!diceOne) document.getElementById('diceImg').src = 'img/dice.png';
  //re-position the buttons
  swiftBtns();
  // switch player
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

newBtn.addEventListener('click', function () {
  // reset the scores
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  // reset the player names
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  // reset the active player
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  activePlayer = 0;
  // re-position the buttons
  rollBtn.classList.remove('btn--right');
  rollBtn.classList.add('btn--left');
  holdBtn.classList.remove('btn--right');
  holdBtn.classList.add('btn--left');
  // reset the dice image
  document.getElementById('diceImg').src = 'img/dice.png';
  // enable the buttons
  rollBtn.disabled = false;
  holdBtn.disabled = false;
});

rollBtn.addEventListener('click', function () {
  // generate a random number between 1 and 6
  const dice = Math.trunc(Math.random() * 6) + 1;
  // display the dice image
  document.getElementById('diceImg').src = 'img/dice-' + dice + '.png';
  // if the dice is 1, switch player
  if (dice === 1) {
    resetCurrentScore();
    switchPlayer(true);
  }
  // if the dice is not 1, add the dice value to the current score
  if (dice !== 1) {
    document.getElementById('current--' + activePlayer).textContent =
      Number(document.getElementById('current--' + activePlayer).textContent) +
      dice;
  }
});

holdBtn.addEventListener('click', function () {
  addScore();
  resetCurrentScore();
  if (
    document.getElementById('score--' + activePlayer).textContent >= gamePoint
  ) {
    document.querySelector('.player--active').classList.add('player--winner');
    document.getElementById('name--' + activePlayer).textContent = 'Winner! 🎉';
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    document.getElementById('diceImg').src = 'img/dice.png';
  } else {
    switchPlayer(false);
  }
});
