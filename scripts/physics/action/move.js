// scripts/mechanisms/physics/action/move.js

/**
 * movePlayer - Handles team leader movement with collision detection
 * @param {string} direction - The direction of movement ('up', 'down', 'left', 'right')
 * @param {number} speed - determines the speed of the player movement 
 */
function movePlayer(direction, speed, timestamp) {
      const deltaTime = Math.max((timestamp - lastUpdate) / 1000, 0.001);
	  const moveSpeed = speed * deltaTime;
	  let newX = player.model.physics.x;
      let newY = player.model.physics.y;
	  
	  const cameraPos = camera.getPosition();

      if (direction === 'up') {
		player.model.physics.y >= moveSpeed ? newY -= moveSpeed : newY = player.model.physics.y;
	  } else if (direction === 'down') {
		player.model.physics.y >= 0 ? newY += moveSpeed : newY = player.model.physics.y;
	  } else if (direction === 'left') {
		player.model.physics.x >= moveSpeed ? newX -= moveSpeed : newX = player.model.physics.x;
	  } else if (direction === 'right') {
		player.model.physics.x >= 0 ? newX += moveSpeed : newX = player.model.physics.x;
	  }
	  
	  const activeSections = envManager.getActiveSections(newX, newY);
	  let isBlocked = false;
	  
	  for (let activeSection of activeSections) {
		if (activeSection.staticCollision) {
			for (let staticC of activeSection.staticCollision) { 
			  let [staticX, staticY] = staticC.split(',').map(Number);
			  const obj2 = {
				  x: staticX * 16, 
				  y: staticY * 16, 
				  maxX: staticX * 16 + 16, 
				  maxY: staticY * 16 + 16
			  };
			  
			  const pWidth = player.model.physics.width / 2;
			  const pHeight = player.model.physics.height / 2;
			  
			  const newPos = {
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
	  player.model.changeDirection(direction);
	  player.model.changeState('walk');
	  player.model.updateAnimation(timestamp);
	  
	  if (!isBlocked) {
		player.model.physics.x = newX;
		player.model.physics.y = newY;
		camera.centerCameraOn(player.model.physics);
	  }
	  envManager.renderEnvironment();
};
