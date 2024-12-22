// scripts/utils/key.js

const pressedKeys = new Set();

/**
 * keydown -
 */
document.addEventListener('keydown', (event) => {
	  if (!pressedKeys.has(event.code)) {
		pressedKeys.add(event.code);
	  }
});

/**
 * keyup -
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
	  if (pressedKeys.has("KeyW") && !pressedKeys.has('KeyS')) {
		movePlayer('up', speed, timestamp);
      } else if (pressedKeys.has('KeyS') && !pressedKeys.has('KeyW')) {
		movePlayer('down', speed, timestamp);
	  } else if (pressedKeys.has('KeyS') && pressedKeys.has('KeyW')) {
		player.model.changeState('idle');
		player.model.updateAnimation(timestamp);
	  }
	  
	  if (pressedKeys.has("KeyA") && !pressedKeys.has('KeyD')) {
		movePlayer('left', speed, timestamp);
	  } else if (pressedKeys.has('KeyD') && !pressedKeys.has('KeyA')) {
		movePlayer('right', speed, timestamp);
      } else if (pressedKeys.has('KeyA') && pressedKeys.has('KeyD')) {
		player.model.changeState('idle');
		player.model.updateAnimation(timestamp);
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