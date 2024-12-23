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

	  switch (direction) {
		case 'up': 
			player.model.physics.y >= moveSpeed ? newY -= moveSpeed : newY = player.model.physics.y;
			break;
		case 'down':
			player.model.physics.y >= 0 ? newY += moveSpeed : newY = player.model.physics.y;
			break;
		case 'left':
			player.model.physics.x >= moveSpeed ? newX -= moveSpeed : newX = player.model.physics.x;
			break;
		case 'right':
			player.model.physics.x >= 0 ? newX += moveSpeed : newX = player.model.physics.x;
			break;
		case 'upleft':
			player.model.physics.y >= moveSpeed ? newY -= moveSpeed : newY = player.model.physics.y;
			player.model.physics.x >= moveSpeed ? newX -= moveSpeed : newX = player.model.physics.x;
			break;
		case 'upright':
			player.model.physics.y >= moveSpeed ? newY -= moveSpeed : newY = player.model.physics.y;
			player.model.physics.x >= 0 ? newX += moveSpeed : newX = player.model.physics.x;
			break;
		case 'downleft':
			player.model.physics.y >= 0 ? newY += moveSpeed : newY = player.model.physics.y;
			player.model.physics.x >= moveSpeed ? newX -= moveSpeed : newX = player.model.physics.x;
			break;
		case 'downright':
			player.model.physics.y >= 0 ? newY += moveSpeed : newY = player.model.physics.y;
			player.model.physics.x >= 0 ? newX += moveSpeed : newX = player.model.physics.x;
			break;
		default:
			player.model.changeState('idle');
			player.model.updateAnimation(timestamp);
			return;
	  };
	  
	  
	  const isBlocked = checkCollisionInActiveSections(newX, newY);
	  checkTriggerCollisions();
	  
	  if (!isBlocked) {
		player.model.changeDirection(direction);
		player.model.changeState('walk');
		player.model.updateAnimation(timestamp);
		player.model.physics.x = newX;
		player.model.physics.y = newY;
		camera.centerCameraOn(player.model.physics);
	  } else {
		/** @todo Add collision reaction*/
		player.model.changeDirection(direction);
		player.model.changeState('idle');
		player.model.updateAnimation(timestamp);
	  }
};
