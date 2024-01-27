const iconMap = ["cherry", "strawberry", "seven", "diamond", "bar", "crown", "clover", "bell"];
const iconHeight = 95, numIcons = 8, timePerIcon = 5, fixedBetAmount = 50;
let currentBet = 0, bettingValuesUsed = 0;

function initializeReels() {
  document.querySelectorAll('.slots > .reel').forEach(reel => 
    Array.from({ length: numIcons }).forEach((_, i) => 
      reel.appendChild(createImageElement(`https://i.ibb.co/dGs3JBB/Gamblingimages.png`, `Image ${i + 1}`)
    )
  ));
}

function createImageElement(src, alt) {
  const img = document.createElement('img');
  img.src = src; img.alt = alt;
  return img;
}

function rollReel(reel, offset = 0) {
  const spins = 3, delta = (offset + 3) * numIcons + Math.round(Math.random() * numIcons * spins);
  const images = Array.from(reel.querySelectorAll('img'));
  const initialIndex = Math.floor(Math.random() * numIcons);

  images.forEach((image, index) => setSpinStyles(image, spins, delta, (initialIndex + index + delta) % numIcons));

  setTimeout(() => images.forEach((image, index) => setStaticStyles(image, (initialIndex + index + delta) % numIcons)), spins * (8 + delta * timePerIcon));
}

function setSpinStyles(image, spins, delta, newIndex) {
  image.style.transition = `transform ${spins * (8 + delta * timePerIcon)}ms ease-out`;
  image.style.transform = `translateY(${-(newIndex * iconHeight + iconHeight)}px)`;
}

function setStaticStyles(image, newIndex) {
  image.style.transition = 'none';
  image.style.transform = `translateY(${-(newIndex * iconHeight)}px)`;
}

function rollAll() {
  const reelsList = document.querySelectorAll('.slots > .reel'), indexes = [0, 0, 0];
  return Promise.all([...reelsList].map((reel, i) => rollReel(reel, i * 2)))
    .then(deltas => {
      deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % numIcons);
      checkForWin(indexes);
      updateBettingCounter();
    });
}

function handleBetClick() {
  currentBet += fixedBetAmount;
  bettingValuesUsed++;
  updateBettingCounter();
}

function updateBettingCounter() {
  document.getElementById('currentBet').textContent = currentBet;
  document.getElementById('bettingValuesUsed').textContent = bettingValuesUsed;
}

function startGame() {
  if (currentBet >= fixedBetAmount) {
    currentBet -= fixedBetAmount;
    rollAll().then(() => setTimeout(() => alert('Round finished! You can place another bet and start a new round.'), 3000));
  } else {
    alert('Insufficient funds. Please place a bet.');
  }
}

initializeReels();
updateBettingCounter();
