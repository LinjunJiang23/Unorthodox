// scripts/mechanisms/physics/action/move.js

let playerPosition = {x: 0, y: 0};


/**
 * movePlayer -
 * @param {string} direction
 * @param {number} speed - determines the speed of the player movement 
 */
function movePlayer(direction, speed) {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
	  
	  let cameraPos = camera.getPosition();

	  playerAnimation.direction = direction;
	  playerAnimation.isMoving = true;
	  playerAnimation.isIdle = false;
	  playerAnimation.animationSpeed = 140;
	  playerAnimation.currentState= "walk";

      if (direction === 'up') {
			playerPosition.y >= (2 * speed) ? newY -= (2 * speed) : newY = playerPosition.y;
	  } else if (direction === 'down') {
			  playerPosition.y >= 0 ? newY += (2 * speed) : newY = playerPosition.y;
	  } else if (direction === 'left') {
			playerPosition.x >= (2 * speed) ? newX -= (2 * speed) : newX = playerPosition.x;
	  } else if (direction === 'right') {
		    playerPosition.x >= 0 ? newX += (2 * speed) : newX = playerPosition.x;
	  }
	  
	  playerPosition.x = newX;
	  playerPosition.y = newY;
	  
	  camera.centerCameraOn(playerPosition);

	  
	  console.log("camera position:", cameraPos);
	  console.log("player position:", playerPosition);
	  
	  envManager.renderEnvironment('testLayer');
};
