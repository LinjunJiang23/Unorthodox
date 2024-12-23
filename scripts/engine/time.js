// scripts/utils/time.js


const gameTime = {
	hour: 6,
	minute: 0,
	second: 0,
	day: 1,
	isDaytime: true,
	isCurfew: false
};


/**
 * timeRollOver - function that roll over in-game time system
 */
function timeRollOver() {
	//Inc time
	if (gameTime.second >= 60) {
		gameTime.second -= 60;
		gameTime.minute++;
	}
	if (gameTime.minute >= 60) {
		gameTime.minute -= 60;
		gameTime.hour++;
	}
	if (gameTime.hour >= 24) {
		gameTime.hour -= 24;
		gameTime.day++;
	}
	
	//Dec time
	if (gameTime.second < 0) {
		gameTime.second += 60;
		gameTime.minute--;
	}
	if (gameTime.minute < 0) {
		gameTime.minute += 60;
		gameTime.hour--;
	}
	if (gameTime.hour < 0) {
		gameTime.hour += 24;
		gameTime.day--;
	}
	
	//Curfew time is from 20:00 to 4:00
	gameTime.isCurfew = gameTime.hour < 4 || gameTime.hour >= 20;
	
	//Day time is from 6:00 to 18:00
	gameTime.isDaytime = gameTime.hour >= 6 && gameTime.hour < 18;
};

/**
 * updateGameTime - function that updates in-game time when player is actively doing some tasks
 * @param {string} timestamp
 * @param {string} unit - update which unit of the game time
 * @param {number} amount - the amount of time advances
 */
function updateGameTime(timestamp, unit = 'second', amount = null) {
	const deltaTime = (timestamp - lastUpdate) / 1000;
	lastUpdate = timestamp;
	if (amount !== null) {
		if (['second', 'minute', 'hour', 'day'].includes(unit)) gameTime[unit] += amountOfTime;
	} else {
		gameTime.second += deltaTime;
	}
	timeRollOver();
};
