const iconMap = ["cherry", "strawberry", "seven", "diamond", "bar", "crown", "clover", "bell"];
const iconWidth = 26;
const iconHeight = 95;
const numIcons = 8;
const timePerIcon = 5; 
const fixedBetAmount = 50; 
indexes = [0, 0 , 0];


function initializeReels() {
  const reelsList = document.querySelectorAll('.slots > .reel');

  reelsList.forEach((reel) => {
    for (let i = 0; i < numIcons; i++) {
      const filename =
            
            `Gamblingimages.png`;
      const imagePath = `https://i.ibb.co/dGs3JBB/${filename}`;
      const altText = `Image ${i + 1}`;
      const imageElement = createImageElement(imagePath, altText);
      reel.appendChild(imageElement);
    }
  });
}


function createImageElement(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

function rollReel(reel, offset = 0) {
  const spins = 3; // Number of spins
  const delta = (offset + 3) * numIcons + Math.round(Math.random() * numIcons * spins);
  const images = reel.querySelectorAll('img');
  const initialIndex = Math.floor(Math.random() * numIcons);

  images.forEach((image, index) => {
    const newIndex = (initialIndex + index + delta) % numIcons;
    image.style.transition = `transform ${spins * (8 + delta * timePerIcon)}ms ease-out`;
    image.style.transform = `translateY(${-(newIndex * iconHeight + iconHeight)}px)`; // Adjusted initial position
  });

  setTimeout(() => {
    images.forEach((image, index) => {
      const newIndex = (initialIndex + index + delta) % numIcons;
      image.style.transition = 'none';
      image.style.transform = `translateY(${-(newIndex * iconHeight)}px)`;
    });
  }, spins * (8 + delta * timePerIcon));
}

function rollAll() {
  const reelsList = document.querySelectorAll('.slots > .reel');
  reelsList.forEach((reel, i) => rollReel(reel, i * 2));
}

let currentBet = 0;
let bettingValuesUsed = 0;

function handleBetClick() {
  currentBet += fixedBetAmount;
  bettingValuesUsed += 1;

  updateBettingCounter();
}

function updateBettingCounter() {
  document.getElementById('currentBet').textContent = currentBet;
  document.getElementById('bettingValuesUsed').textContent = bettingValuesUsed;
}

function startGame() {
  if (currentBet >= fixedBetAmount) {
    currentBet -= fixedBetAmount;
    rollAll(); 
  } else {
    alert('Insufficient funds. Please place a bet.');
  }


  updateBettingCounter();
}

initializeReels();
updateBettingCounter();
