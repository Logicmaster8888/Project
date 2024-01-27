// Constants
const iconMap = ["cherry", "strawberry", "seven", "diamond", "bar", "crown", "clover", "bell"];
const iconWidth = 26;
const iconHeight = 95;
const numIcons = 8;
const timePerIcon = 5; // Increased timePerIcon for smoother spinning
const fixedBetAmount = 50; // Fixed bet amount

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

// Function to create image element
function createImageElement(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

// Function to roll a single reel with spinning effect
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

  // After the spinning effect, reset the transform property
  setTimeout(() => {
    images.forEach((image, index) => {
      const newIndex = (initialIndex + index + delta) % numIcons;
      image.style.transition = 'none';
      image.style.transform = `translateY(${-(newIndex * iconHeight)}px)`;
    });
  }, spins * (8 + delta * timePerIcon));
}

// Check for win conditions


// Function to roll all reels
function rollAll() {
  const reelsList = document.querySelectorAll('.slots > .reel');
  const indexes = [0, 0, 0];


// Game-related functions
let currentBet = 0;
let bettingValuesUsed = 0;

// Function to handle bet click
function handleBetClick() {
  currentBet += fixedBetAmount;
  bettingValuesUsed += 1;

  // Update the UI
  updateBettingCounter();
}

// Function to update the betting counter
function updateBettingCounter() {
  document.getElementById('currentBet').textContent = currentBet;
  document.getElementById('bettingValuesUsed').textContent = bettingValuesUsed;
}

// Function to start the game
function startGame() {
  if (currentBet >= fixedBetAmount) {
    // Deduct the fixed bet amount
    currentBet -= fixedBetAmount;

    // Start spinning
    rollAll().then(() => {
      // Wait for the spinning to finish before allowing the next round
      setTimeout(() => {
        alert('Round finished! You can place another bet and start a new round.');
      }, 3000);
    });
  } else {
    alert('Insufficient funds. Please place a bet.');
  }
}

// Initialize reels and update the betting counter initially
initializeReels();
updateBettingCounter();

