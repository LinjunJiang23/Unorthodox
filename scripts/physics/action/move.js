// scripts/mechanisms/physics/action/move.js

/**
 * movePlayer - Handles player movement with collision detection
 * @param {string} direction - The direction of movement ('up', 'down', 'left', 'right')
 * @param {number} speed - determines the speed of the player movement 
 */
function movePlayer(direction, speed, timestamp) {
      const division = 1/1000;
	  const MIN_DELTA = 0.001;
	  let deltaTime = (timestamp - lastUpdate) * division;
	  if (deltaTime < MIN_DELTA) deltaTime = MIN_DELTA;
	  let moveSpeed = speed * deltaTime;
	  let newX = playerPosition.x;
      let newY = playerPosition.y;
	  
	  let cameraPos = camera.getPosition();

      if (direction === 'up') {
			playerPosition.y >= moveSpeed ? newY -= moveSpeed : newY = playerPosition.y;
	  } else if (direction === 'down') {
			  playerPosition.y >= 0 ? newY += moveSpeed : newY = playerPosition.y;
	  } else if (direction === 'left') {
			playerPosition.x >= moveSpeed ? newX -= moveSpeed : newX = playerPosition.x;
	  } else if (direction === 'right') {
		    playerPosition.x >= 0 ? newX += moveSpeed : newX = playerPosition.x;
	  }
	  
	  let activeSections = envManager.getActiveSections(newX, newY);
	  let isBlocked = false;
	  
	  for (let activeSection of activeSections) {
		if (activeSection.staticCollision) {
			for (let staticC of activeSection.staticCollision) { 
			  let [staticX, staticY] = staticC.split(',').map(Number);
			  let obj2 = {
				  x: staticX * 16, 
				  y: staticY * 16, 
				  maxX: staticX * 16 + 16, 
				  maxY: staticY * 16 + 16
			  };
			  
			  const pWidth = playerPosition.width / 2;
			  const pHeight = playerPosition.height / 2;
			  
			  let newPos = {
				  x: newX - pWidth,
				  y: newY - pHeight,
				  maxX: newX + pWidth,
				  maxY: newY + pHeight
			  };
			  			  
			  if (checkCollision(newPos, obj2)) {
				isBlocked = true;
				break;
			  }
			}
		}
	  }
	  playerAnimation.changeState('walk', direction);
	  playerAnimation.updateAnimation(timestamp);
	  
	  if (!isBlocked) {
		playerPosition.x = newX;
		playerPosition.y = newY;
		camera.centerCameraOn(playerPosition);
	  }
	  envManager.renderEnvironment('testLayer');
};
