// scripts/engine/control/keyboard.js

/**
 * keydown
 */
document.addEventListener('keydown', (event) => {
	addKeysToInput([event.code]);
});

/**
 * keyup
 */
document.addEventListener('keyup', (event) => {
	removeKeysFromInput([event.code]);
});

function isKeyPressed(pressedKeys, key) {
	return (pressedKeys.has(key));
};

/**
 *   
 */
function handleKBMove(pressedKeys, timestamp) {
	const validKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);
    const leader = getLeader();
	const leaderModel = getModel(leader);
	/* Character Control */
	  
	// Character Movement:
	let dx = 0;
	let dy = 0;	

	if (pressedKeys.has("KeyW")) dy -= 1;
	if (pressedKeys.has("KeyS")) dy += 1;
	if (pressedKeys.has("KeyA")) dx -= 1;
	if (pressedKeys.has("KeyD")) dx += 1;
	
	const vertConflict = pressedKeys.has('KeyW') && pressedKeys.has('KeyS');
	const horiConflict = pressedKeys.has('KeyA') && pressedKeys.has('KeyD');
	const isIdle = vertConflict || horiConflict || (dx === 0 && dy === 0);

	if (isIdle) {
		leaderModel.set_state('idle');
		leaderModel.update_animation(timestamp);
	}
	else {
		const isRunning = pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight');
		isRunning ? runLeader(leader, dx, dy, timestamp) : walkLeader(leader, dx, dy, timestamp);
	}
	  
	  if (![...pressedKeys].some(key => validKeys.has(key))) {
		leaderModel.idleTime += (timestamp - lastUpdate);
		leaderModel.set_state('idle');
		leaderModel.update_animation(timestamp);
	  } else {
		leaderModel.idleTime = 0;
	  }
};

	  /* Camera Movement */
	  // if (pressedKeys.has("ArrowLeft")) {
		// event.preventDefault();
	  // } else if (pressedKeys.has("ArrowRight")) {
		// event.preventDefault();
	  // } else if (pressedKeys.has("ArrowUp")) {
		// event.preventDefault();
	  // } else if (pressedKeys.has("ArrowDown")) {
		// event.preventDefault();
	  // }