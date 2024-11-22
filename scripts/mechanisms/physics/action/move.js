// scripts/mechanisms/physics/action/move.js

let playerPosition = {x: 0, y: 0};


/**
 * movePlayer -
 * @param {string} direction
 * @param {number} speed - determines the speed of the player movement 
 */
function movePlayer(direction, speed = 1) {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
	  
	  let cameraPos = camera.getPosition();

	  playerAnimation.direction = direction;
	  playerAnimation.isMoving = true;
	  playerAnimation.isIdle = false;
	  playerAnimation.animationSpeed = 140;
	  playerAnimation.currentState= "walk";


	  // IF within the 256x256 initial camera position, 
	  // DONOT update the camera position but update player position
      if (direction === 'up') {
			playerPosition.y >= 8 ? newY -= 8 : newY = playerPosition.y;
	  } else if (direction === 'down') {
			  playerPosition.y >= 0 ? newY += 8 : newY = playerPosition.y;
	  } else if (direction === 'left') {
			playerPosition.x >= 8 ? newX -= 8 : newX = playerPosition.x;
	  } else if (direction === 'right') {
		    playerPosition.x >= 0 ? newX += 8 : newX = playerPosition.x;
	  }
	  
	  playerPosition.x = newX;
	  playerPosition.y = newY;
	  
	  camera.centerCameraOn(playerPosition);

	  
	  console.log("camera position:", cameraPos);
	  console.log("player position:", playerPosition);
	  
	  envManager.renderEnvironment('testLayer');
};

/* Keyboard Event Listener */

/**
 * keydown:
 * Character Movement, Camera Movement 
 */
document.addEventListener('keydown', (event) => {
      let speed = 1;
	  if (event.shiftKey) console.log('Shift key was holding! Should implement running and other functionality later.');
	  
	  
	  /* Character Control */
	  // Character Movement:
	  if (event.key === "W" || event.key === "w") {
          event.preventDefault();
          movePlayer('up');
      } else if (event.key === "S" || event.key === "s") {
          event.preventDefault();
          movePlayer('down');
      } else if (event.key === "A" || event.key === "a") {
          event.preventDefault();
          movePlayer('left');
      } else if (event.key === 'd' || event.key === "D") {
          event.preventDefault();
          movePlayer('right');
      }
	  
	  //Camera Movement:
	  if (event.key === "ArrowLeft") {
		  event.preventDefault();
	  } else if (event.key === "ArrowRight") {
		event.preventDefault();
	  } else if (event.key === "ArrowUp") {
		event.preventDefault();
	  } else if (event.key === "ArrowDown") {
		event.preventDefault();
	  }
});

/**
 * keyup:
 * Character Idle Animation
 */
document.addEventListener('keyup', (event) => {
	if (event.key === "W" || event.key === "w" || 
		event.key === "S" || event.key === "s" || event.key === "A" || 
		event.key === "a" || event.key === 'd' || event.key === "D") {
		playerAnimation.stop();
	}
});