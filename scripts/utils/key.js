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
function handleKeyboardControl(deltaTime) {
	let speed = ((pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight')) ? 30 : 10) * deltaTime;
	let validKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);

	  /* Character Control */
	  // Character Movement:
	  if (pressedKeys.has("KeyW") && !pressedKeys.has('KeyS')) {
		movePlayer('up', speed);
      } else if (pressedKeys.has('KeyS') && !pressedKeys.has('KeyW')) {
		movePlayer('down', speed);
	  } else if (pressedKeys.has('KeyS') && pressedKeys.has('KeyW')) {
		playerAnimation.stop();
	  }
	  
	  if (pressedKeys.has("KeyA") && !pressedKeys.has('KeyD')) {
		movePlayer('left', speed);
	  } else if (pressedKeys.has('KeyD') && !pressedKeys.has('KeyA')) {
		movePlayer('right', speed);
      } else if (pressedKeys.has('KeyA') && pressedKeys.has('KeyD')) {
		playerAnimation.stop();	  
	  }
	  
	  if (pressedKeys.isDisjointFrom(validKeys)) {
		playerAnimation.stop();
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