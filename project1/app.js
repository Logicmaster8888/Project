// Constants
const iconWidth = 80;
const iconHeight = 80;
const numIcons = 8;
const timePerIcon = 100;
// these are the constants used in the script to define the width and height of my slot machine icons. The number of icons on each reel, and the time it takes for each icon to move during a reel roll.
let currentBet = 0; //This is used to store the current bet amount. It is set to 0.


function createImageElement(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}
// This is used as a html image to source back to src.

// Function to initialize reels with images
function initializeReels() {
  const reelsList = document.querySelectorAll('.slots > .reel');

  reelsList.forEach((reel) => {
    for (let i = 0; i < numIcons; i++) {
      const filename = `Gamblingimages.png`; 
      const imagePath = `https://i.ibb.co/dGs3JBB/${filename}`;
      const altText = `Image ${i + 1}`;
      const imageElement = createImageElement(imagePath, altText);
      reel.appendChild(imageElement);
    }
  });
}
//This part of the slot machine reels by appending  aspecific number of images. I still need to fix out how it would look when rotating. 

// Function to roll a single reel
function rollReel(reel, offset = 0) {
  const delta = (offset + 3) * numIcons + Math.round(Math.random() * numIcons);
  const style = getComputedStyle(reel);
  const backgroundPositionY = parseFloat(style.backgroundPositionY);
  reel.style.transition = `background-position-y ${8 + delta * timePerIcon}ms`;
  reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
}
// This will animate the roll of a single reel. It is calculating the new position of the reel based on a random offset and update of the background Position property to create a rolling effect. 

// Function to roll all reels
function rollAll() {
  const reelsList = document.querySelectorAll('.slots > .reel');
  reelsList.forEach((reel, i) => rollReel(reel, i * 2));
}
// This is used for the all reels, for all reels to delay 2 to create a staggered effect.

// Function to update the betting counter
function updateBettingCounter() {
  document.getElementById('currentBet').textContent = currentBet;
}
// This is utilized to create a betting counter from the bet buttons. 

// Bet button is clicked to increase the current bet by the specified bet amount and updates the betting counter. 
function handleBetClick(betAmount) {
  currentBet += betAmount;
  updateBettingCounter();
}

// The use of the button to start the game. 
function startGame() {
  rollAll();
}


initializeReels();
updateBettingCounter(); // to Update the betting counter initially

