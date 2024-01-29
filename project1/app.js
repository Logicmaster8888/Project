const debugEl = document.getElementById('debug');
const iconMap = ["cherry", "strawberry", "seven", "diamond", "bar", "crown", "clover", "bell", "horseshoe"]
  .map((icon, index) => ({ index, value: icon }));
const iconWidth = 79;
const iconHeight = 79;
const numIcons = 9;
const timePerIcon = 100;
const indexes = [0, 0, 0];
let currentBet = 0;
let bettingValuesUsed = 0;
let isRolling = false;
// Debugging https://www.w3schools.com/js/js_debugging.asp
// Array index mapping https://stackoverflow.com/questions/69273338/how-can-i-dynamically-map-icons-with-values-im-getting-from-an-array-of-objects
// https://codepen.io/josfabre/pen/abReBvP
// Slot machine min of spin time, lapse b/w slots, position, num of slots and numb of slot symbols 
// https://forum.gdevelop.io/t/example-slot-machine-algorithm-updated-v2/10604
// gambling script https://stackoverflow.com/questions/35595172/i-need-a-solution-for-a-gambling-script
// Machine Slot Math Logic broken down https://www.vincentbruijn.nl/articles/slot-machine-math/

// Dom event listener function https://www.w3schools.com/jsref/met_element_addeventlistener.asp
// Query Selection https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners to the bet buttons
  document.querySelectorAll('.bet').forEach((button, index) => {
    button.addEventListener('click', function () {
      handleBetClick((index + 1) * 50);
    });
  });
 
// icon creation and as well as indexing are from 
// https://stackoverflow.com/questions/56336348/javascript-slot-machine-what-is-a-simple-algorithm-for-picking-a-winner
// https://codepen.io/josfabre/pen/abReBvP?editors=1111 
  // Add event listener to the start button
  document.getElementById('startButton').addEventListener('click', startGame);
//getElementByID https://www.w3schools.com/jsref/met_document_getelementbyid.asp
// button start game logic https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser/Buttons
  // Initial kick-off after a delay
  // setTimeout(rollAll, 300); // Remove automatic start
// function else if and start game conditions https://www.freecodecamp.org/news/javascript-if-else-and-if-then-js-conditional-statements/
  function startGame() {
    if (!isRolling) {
      if (currentBet >= 100 && bettingValuesUsed < 50) {
        console.log('Start button clicked');
        currentBet -= 100;
        bettingValuesUsed += 1;
        rollAll();
        updateBettingCounter();
        initiateRolling();
      } else if (bettingValuesUsed >= 50) {
        console.log('Maximum spins reached.');
      } else {
        console.log('Not enough current bet to start.');
      }
    } else {
      console.log('Game is already rolling.');
    }
  }
// reset game logic https://stackoverflow.com/questions/58801596/how-to-create-a-reset-button-in-a-js-game
  function resetGame() {
    currentBet = 0;
    bettingValuesUsed = 0;
    updateBettingCounter();
    console.log('Game reset.');
  }

  function handleBetClick(amount) {
    if (amount > 0) {
      console.log(`Bet ${amount} button clicked`);
      currentBet += amount;
      updateBettingCounter();
    } else if (amount === 0) {
      console.log('Start button clicked');
      currentBet -= 50;
      updateBettingCounter();
    } else {
      console.log(`Invalid bet amount: ${amount}`);
    }
  }
// function of a loop counter https://stackoverflow.com/questions/10179815/get-loop-counter-index-using-for-of-syntax-in-javascript
// Alert message for JS https://www.w3schools.com/jsref/met_win_alert.asp

  function updateBettingCounter() {
    document.getElementById('currentBet').textContent = currentBet;
    document.getElementById('bettingValuesUsed').textContent = bettingValuesUsed;
    updateDebug();
  }

  // index Win Conditions https://stackoverflow.com/questions/41550195/filtering-array-by-index-and-matching-values
  function checkWinConditions() {
    if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
      return {
        condition: 3,
        payout: 1500,
        message: `Win with all three matching! You won ${currentBet} coins.`
      };
    } else if (indexes[0] === indexes[1] || indexes[1] === indexes[2] || indexes[0] === indexes[2]) {
      return {
        condition: 2,
        payout: 1000,
        message: `Win with two matching! You won ${currentBet / 2} coins.`
      };
    } else {
      return {
        condition: 0,
        payout: 0,
        message: "No win. Try again!"
      };
    }
  }

  const roll = (reel, offset = 0) => {
    const delta = (offset + 7) * numIcons + Math.round(Math.random() * numIcons);
// Winning condition through promise resolve https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//https://codepen.io/josfabre/pen/abReBvP
// https://codepen.io/melstrict/pen/LYjwzBy
// use of icon logic for async function and promises
    return new Promise((resolve) => {
      const style = getComputedStyle(reel);
      const backgroundPositionY = parseFloat(style.backgroundPositionY);
      const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
      const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);
// Delay Set timeout function for reel reset transiton https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
// slot machine logic for timeout out off off set https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
//  Pagination https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
// Delta encoding https://en.wikipedia.org/wiki/Delta_encoding

// Delta number of index defined https://gist.github.com/ghalimi/4524732
// random number generator https://stackoverflow.com/questions/41580650/biased-random-number-generator-java
// Delta Debugger https://github.com/wala/jsdelta
// Delta Game Loop https://stephendoddtech.com/blog/game-design/variable-delta-time-javascript-game-loop
      setTimeout(() => {
        reel.style.transition = 'none'; // Reset transition to prevent conflicts
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
      }, offset * 150);

      // Use requestAnimationFrame for smooth animations
      requestAnimationFrame(() => {
        reel.style.transition = `background-position-y ${timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
      });
// backgroundPosiition https://www.w3schools.com/jsref/prop_style_backgroundposition.asp
      setTimeout(() => {
        reel.style.transition = 'none';
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % numIcons);
      }, timePerIcon + offset * 150);
    });
  };
// visual background position change https://stackoverflow.com/questions/15066465/changing-background-position-with-javascript
// Background alteration http://help.dottoro.com/ljagnmgn.php
// Transition of reel https://codepen.io/melstrict/pen/LYjwzBy
// Style Background alteration https://codepen.io/josfabre/pen/abReBvP
  function rollAll() {
    debugEl.textContent = 'spinning...';
    const reelsList = document.querySelectorAll('.slots > .reel');

    Promise.all([...reelsList].map((reel, i) => roll(reel, i)))
      .then((deltas) => {
        deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % numIcons);
        debugEl.textContent = indexes.join(' - ');

        const winResult = checkWinConditions();

        if (winResult.condition > 0) {
          handleWin(winResult);
        } else {
          handleNoWin();
        }

        // setTimeout(rollAll, 3000); // Remove automatic start
      });
  }
// Access the return of win conditions https://forum.freecodecamp.org/t/tic-tac-toe-win-conditions/188792 
  function handleWin(winResult) {
    console.log(winResult.message);
    // Additional actions for a win, e.g., display an alert, update UI, etc.
    alert(winResult.message);
  }
// Alert Win Result JS https://www.w3schools.com/js/js_popup.asp
  function handleNoWin() {
    console.log("No win. Try again!");
    // Additional actions for no win, if needed
  }
// Game Logic for Timeout https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/
  // Remove the initial kick-off setTimeout(rollAll, 1000);
});

