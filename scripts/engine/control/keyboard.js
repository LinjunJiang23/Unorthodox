// scripts/utils/key.js

const pressedKeys = new Set();

/**
 * keydown
 */
document.addEventListener('keydown', (event) => {
	  if (!pressedKeys.has(event.code)) {
		pressedKeys.add(event.code);
	  }
});

/**
 * keyup
 */
document.addEventListener('keyup', (event) => {
	pressedKeys.delete(event.code);
});


/**
 * handleKeydown -  
 */
function handleKeyboardControl(timestamp) {
	let speed = (pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight')) ? 40 : 10;
	let validKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);

	  /* Character Control */
	  
	  // Character Movement:
	  if (pressedKeys.has("KeyW") && !pressedKeys.has('KeyS') && !pressedKeys.has('KeyA') && !pressedKeys.has('KeyD')) {
		movePlayer('up', speed, timestamp);
      } else if (pressedKeys.has('KeyS') && !pressedKeys.has('KeyW') && !pressedKeys.has('KeyA') && !pressedKeys.has('KeyD')) {
		movePlayer('down', speed, timestamp);
	  } else if (pressedKeys.has('KeyS') && pressedKeys.has('KeyW')) {
		movePlayer('idle', speed, timestamp);
	  } else if (pressedKeys.has("KeyA") && !pressedKeys.has('KeyD') && !pressedKeys.has("KeyW") && !pressedKeys.has('KeyS')) {
		movePlayer('left', speed, timestamp);
	  } else if (pressedKeys.has('KeyD') && !pressedKeys.has('KeyA') && !pressedKeys.has("KeyW") && !pressedKeys.has('KeyS')) {
		movePlayer('right', speed, timestamp);
      } else if (pressedKeys.has('KeyA') && pressedKeys.has('KeyD')) {
		movePlayer('idle', speed, timestamp);
	  } else if (pressedKeys.has('KeyW') && pressedKeys.has("KeyD") && !pressedKeys.has('KeyA') && !pressedKeys.has('KeyS')) {
		movePlayer('upright', speed, timestamp);
	  } else if (pressedKeys.has('KeyW') && pressedKeys.has("KeyA") && !pressedKeys.has('KeyD') && !pressedKeys.has('KeyS')) {
		movePlayer('upleft', speed, timestamp);
	  } else if (pressedKeys.has('KeyS') && pressedKeys.has("KeyD") && !pressedKeys.has('KeyA') && !pressedKeys.has('KeyW')) {
		movePlayer('downright', speed, timestamp);
	  } else if (pressedKeys.has('KeyS') && pressedKeys.has("KeyA") && !pressedKeys.has('KeyD') && !pressedKeys.has('KeyW')) {
		movePlayer('downleft', speed, timestamp);
	  }
	  
	  if (![...pressedKeys].some(key => validKeys.has(key))) {
		player.model.idleTime += (timestamp - lastUpdate);
		player.model.changeState('idle');
		player.model.updateAnimation(timestamp);
	  } else {
		player.model.idleTime = 0;
	  }
	  	  /* Camera Movement */
	  if (pressedKeys.has("ArrowLeft")) {
		event.preventDefault();
	  } else if (pressedKeys.has("ArrowRight")) {
		event.preventDefault();
	  } else if (pressedKeys.has("ArrowUp")) {
		event.preventDefault();
	  } else if (pressedKeys.has("ArrowDown")) {
		event.preventDefault();
	  }
};