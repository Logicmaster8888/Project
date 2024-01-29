const debugEl = document.getElementById('debug');
const iconMap = [
    "strawberry", "cherry", "seven", "bell", "clover", "crown", "bar", "horseshoe", "diamond"
].map((icon, index) => ({ index, value: icon }));
const iconWidth = 79;
const iconHeight = 79;
const numIcons = 9;
const timePerIcon = 10;
let indexes = [0, 0, 0].map((index) => ({ index }));
let currentBet = 0; // Initial value
let bettingValuesUsed = 0;
let isRolling = false; // Flag to track if the game is currently rolling

document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to the bet buttons
    document.querySelector('.bet:nth-child(1)').addEventListener('click', function () {
        handleBetClick(50);
    });

    document.querySelector('.bet:nth-child(2)').addEventListener('click', function () {
        handleBetClick(100);
    });

    document.querySelector('.bet:nth-child(3)').addEventListener('click', function () {
        handleBetClick(150);
    });

    // Add event listener to the start button
    document.getElementById('startButton').addEventListener('click', startGame);

    // Initial kick-off after a delay
    setTimeout(rollAll, 300);
});

function startGame() {
    if (!isRolling) {
        if (currentBet >= 100 && bettingValuesUsed < 50) {
            console.log('Start button clicked');
            currentBet -= 100;
            bettingValuesUsed += 1;
            rollAll();
            updateBettingCounter();
            initiateRolling(); // Start the game after the "Start" button is clicked
        } else if (bettingValuesUsed >= 50) {
            console.log('Maximum spins reached.');
        } else {
            console.log('Not enough current bet to start.');
        }
    } else {
        console.log('Game is already rolling.');
    }
}

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

function updateBettingCounter() {
    document.getElementById('currentBet').textContent = currentBet;
    document.getElementById('bettingValuesUsed').textContent = bettingValuesUsed;
    updateDebug();
}

/**
 * Check for win conditions
 */
function checkWinConditions() {
    // Check for a win by matching indexes
    if (indexes[0].index === indexes[1].index && indexes[1].index === indexes[2].index) {
        // Win with all three matching
        return {
            condition: 3,
            payout: 1500,
            message: `Win with all three matching! You won ${currentBet} coins.`
        };
    } else if (
        indexes[0].index === indexes[1].index ||
        indexes[1].index === indexes[2].index ||
        indexes[0].index === indexes[2].index
    ) {
        // Win with two matching
        return {
            condition: 2,
            payout: 1000,
            message: `Win with two matching! You won ${currentBet / 2} coins.`
        };
    } else {
        // No win
        return {
            condition: 0,
            payout: 0,
            message: "No win. Try again!"
        };
    }
}

/**
 * Roll one reel
 */
const roll = (reel, offset = 0) => {
    const delta = (offset + 7) * numIcons + Math.round(Math.random() * numIcons);

    return new Promise((resolve) => {
        const style = getComputedStyle(reel);
        const backgroundPositionY = parseFloat(style.backgroundPositionY);
        const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
        const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

        setTimeout(() => {
            reel.style.transition = `background-position-y ${(9 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
            reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
        }, offset * 7);

        setTimeout(() => {
            reel.style.transition = 'none';
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta % numIcons);
        }, (9 + 1 * delta) * timePerIcon + offset * 7);
    });
};

/**
 * Roll all reels, check for wins, and update UI
 */
function rollAll() {
	
	debugEl.textContent = 'rolling...';
	
	const reelsList = document.querySelectorAll('.slots > .reel');
	
	Promise
		
		// Activate each reel, must convert NodeList to Array for this with spread operator
		.all( [...reelsList].map((reel, i) => roll(reel, i)) )	
		
		// When all reels done animating (all promises solve)
		.then((deltas) => {
			// add up indexes
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');
		
			// Win conditions
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
			}
		
			// Again!
			setTimeout(rollAll, 3000);
		});
};

// Kickoff
setTimeout(rollAll, 1000);
